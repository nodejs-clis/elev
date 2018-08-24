/**
 * 主文件
 * @author ydr.me
 * @create 2018-08-14 09:37
 * @update 2018-08-14 09:37
 */


'use strict';

var console = require('blear.node.console');
var array = require('blear.utils.array');
var plan = require('blear.utils.plan');
// @link https://github.com/publishlab/node-acme-client
var acme = require('acme-client');

var alidns = require('./alidns');
var constant = require('../settings/constant');
var csr = require('./csr');
var wait = require('../utils/wait');

module.exports = issue;

// ========================

/**
 * 颁发
 * @param configs
 * @param configs.dnsMaxCheckTimes
 * @param configs.dnsServerName
 * @param configs.dnsServerAccessKey
 * @param configs.dnsServerAccessSecret
 * @param configs.emailAddress
 * @param configs.debug
 * @param configs.domain
 * @param configs.dnsRefreshSeconds
 * @param callback
 */
function issue(configs, callback) {
    var certificateKey = null;
    var certificateCsr = null;
    var certificateCert = null;
    var order = null;
    var client = null;
    var domain = configs.domain;
    var dnsRefreshSeconds = configs.dnsRefreshSeconds;

    plan
        .taskPromise(function () {
            console.logWithTime('创建私钥');
            return acme.openssl.createPrivateKey();
        })
        .taskSync(function (privateKey) {
            client = new acme.Client({
                directoryUrl:
                    constant.DEBUG
                        ? acme.directory.letsencrypt.staging
                        : acme.directory.letsencrypt.production,
                accountKey: privateKey,
                backoffAttempts: configs.dnsMaxCheckTimes
            });
        })
        .taskPromise(function () {
            console.logWithTime('创建 Let’s Encrypt 账户');
            return client.createAccount({
                termsOfServiceAgreed: true,
                contact: ['mailto:' + configs.emailAddress]
            });
        })
        .taskPromise(function () {
            console.logWithTime('创建 Let’s Encrypt 订单');
            return client.createOrder({
                identifiers: [
                    {type: 'dns', value: domain},
                    {type: 'dns', value: '*.' + domain}
                ]
            });
        })
        .taskPromise(function (_order) {
            order = _order;
            console.logWithTime('处理 Let’s Encrypt 订单');
            return client.getAuthorizations(order);
        })
        .task(function (next, authorizations) {
            console.logWithTime('需要验证', authorizations.length, '次');
            plan
                .each(authorizations, verify)
                .serial(next);
        })
        // .taskPromise(function () {
        //     console.logWithTime('创建 csr');
        //     return acme.openssl.createCsr({
        //         // 通用名称
        //         commonName: domain,
        //         altNames: [
        //             domain,
        //             '*.' + domain
        //         ],
        //         // @link https://countrycode.org/
        //         country: configs.country,
        //         state: configs.state,
        //         locality: configs.locality,
        //         organization: configs.organization
        //     });
        // })
        .taskSync(function () {
            return csr(configs);
        })
        .taskPromise(function (com) {
            certificateKey = com[0];
            certificateCsr = com[1];

            if (configs.debug) {
                console.logWithTime('certificateKey');
                console.log(com[0].toString());
                console.logWithTime('certificateCsr');
                console.log(com[1].toString());
            }

            console.logWithTime('完成 Let’s Encrypt 订单');
            return client.finalizeOrder(order, certificateCsr);
        })
        .taskPromise(function () {
            console.logWithTime('获取 Let’s Encrypt 证书');
            return client.getCertificate(order);
        })
        .taskSync(function (cert) {
            certificateCert = cert;
        })
        .serial()
        .try(function () {
            // console.logWithTime('Let’s Encrypt 证书密钥');
            // console.logWithTime(certificateKey.toString());
            // console.logWithTime('Let’s Encrypt 证书链');
            // console.logWithTime(certificateCert.toString());
            callback(null, [certificateKey, certificateCert]);
        })
        .catch(function (err) {
            console.errorWithTime('Let’s Encrypt 证书颁发失败');
            console.errorWithTime(err.message);
            callback(err);
        });


    // https://github.com/publishlab/node-acme-client/blob/master/examples/api.js
    function verify(index, authz, callback) {
        var challenge = null;
        var challengeValue = null;

        array.each(authz.challenges, function (index, _) {
            if (_.type === 'dns-01') {
                challenge = _;
                return false;
            }
        });

        if (!challenge) {
            return callback();
        }

        console.logWithTime('第', index + 1, '次验证');
        plan
            .taskPromise(function () {
                console.logWithTime('选择验证方式', challenge.type);
                return client.getChallengeKeyAuthorization(challenge);
            })
            .task(function (next, keyAuthorization) {
                console.logWithTime('应用验证方式');
                challengeValue = keyAuthorization;
                return applyChallenge(authz, challenge, keyAuthorization, next);
            })
            .taskPromise(function () {
                console.logWithTime('提交验证结果');
                return client.completeChallenge(challenge);
            })
            .taskPromise(function () {
                console.logWithTime('等待验证状态');
                wait.loading();
                return client.waitForValidStatus(challenge);
            })
            .task(function (next) {
                wait.loadingEnd();
                console.logWithTime('验证成功');
                finshChallenge(authz, challenge, next);
            })
            .serial()
            .try(function () {
                callback(null);
            })
            .catch(function (err) {
                wait.loadingEnd();
                finshChallenge(authz, challenge, function () {
                    callback(err);
                });
            });
    }


    /**
     * 应付挑战
     * @param authz
     * @param challenge
     * @param keyAuthorization
     * @param callback
     */
    function applyChallenge(authz, challenge, keyAuthorization, callback) {
        console.logWithTime('验证查询地址', challenge.url);

        plan
            .task(function (next) {
                alidns.addRecord(
                    configs,
                    keyAuthorization,
                    next
                );
            })
            .taskSync(function (recordId) {
                challenge._alidnsRecordId = recordId;
            })
            .task(function (next) {
                wait.countdown(dnsRefreshSeconds, '等待 DNS 记录生效，倒计时 %d 秒', function () {
                    next();
                });
            })
            .serial(callback);
    }


    /**
     * 完成挑战
     * @param authz
     * @param challenge
     * @param callback
     */
    function finshChallenge(authz, challenge, callback) {
        plan
            .task(function (next) {
                alidns.removeRecord(
                    configs,
                    challenge._alidnsRecordId,
                    next
                );
            })
            .serial(function (err) {
                callback();
            });
    }
}


// =================================
/**
 * 打印 loading
 */
function consoleLoading() {
    if (process.env[constant.WORKER_ENV]) {
        return;
    }

    console.loading();
}

/**
 * 打印 loading end
 */
function consoleLoadingEnd() {
    if (process.env[constant.WORKER_ENV]) {
        return;
    }

    console.loadingEnd();
}

