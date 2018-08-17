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
var time = require('blear.utils.time');
// @link https://github.com/publishlab/node-acme-client
var acme = require('acme-client');

var alidns = require('./alidns');

issue();

// ========================
function issue() {
    var configs = {
        accessKeyId: 'xxx',
        accessKeySecret: 'yyy',
        email: 'zzz',
        debug: true,
        domain: 'example.com',
        // dns 验证等待时间
        dnsVerifyWaitTime: 2 * 60 * 1000,
        cookies: {},
        certificateKey: null,
        certificateCsr: null,
        certificateCert: null,
        order: null,
        client: null
    };

    plan
        .taskPromise(function () {
            console.logWithTime('创建私钥');
            return acme.openssl.createPrivateKey();
        })
        .taskSync(function (privateKey) {
            configs.client = new acme.Client({
                directoryUrl: acme.directory.letsencrypt.staging,
                accountKey: privateKey,
                backoffAttempts: 10
            });
        })
        .taskPromise(function () {
            console.logWithTime('创建 Let’s Encrypt 账户');
            return configs.client.createAccount({
                termsOfServiceAgreed: true,
                contact: ['mailto:' + configs.email]
            });
        })
        .taskPromise(function () {
            console.logWithTime('创建 Let’s Encrypt 订单');
            return configs.client.createOrder({
                identifiers: [
                    {type: 'dns', value: configs.domain},
                    {type: 'dns', value: '*.' + configs.domain}
                ]
            });
        })
        .taskPromise(function (order) {
            configs.order = order;
            console.logWithTime('处理 Let’s Encrypt 订单');
            return configs.client.getAuthorizations(order);
        })
        .task(function (next, authorizations) {
            console.logWithTime('需要验证', authorizations.length, '次');
            plan
                .each(authorizations, verify)
                .serial(next);
        })
        .taskPromise(function () {
            console.logWithTime('创建 csr');
            return acme.openssl.createCsr({
                commonName: '*.' + configs.domain,
                altNames: [configs.domain]
            });
        })
        .taskPromise(function (com) {
            configs.certificateKey = com[0];
            configs.certificateCsr = com[1];
            console.logWithTime('完成 Let’s Encrypt 订单');
            return configs.client.finalizeOrder(configs.order, configs.certificateCsr);
        })
        .taskPromise(function () {
            console.logWithTime('获取 Let’s Encrypt 证书');
            return configs.client.getCertificate(configs.order);
        })
        .taskSync(function (cert) {
            configs.certificateCert = cert;
        })
        .serial()
        .try(function () {
            console.logWithTime('Let’s Encrypt 证书密钥');
            console.logWithTime(configs.certificateKey.toString());
            console.logWithTime('Let’s Encrypt 证书链');
            console.logWithTime(configs.certificateCert.toString());
        })
        .catch(function (err) {
            console.logWithTime('Let’s Encrypt 证书颁发失败');
            console.errorWithTime(err.message);
        });


    // https://github.com/publishlab/node-acme-client/blob/master/examples/api.js
    function verify(index, authz, callback) {
        var challenge = null;

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
                return configs.client.getChallengeKeyAuthorization(challenge);
            })
            .task(function (next, keyAuthorization) {
                console.logWithTime('应用验证方式');
                return applyChallenge(authz, challenge, keyAuthorization, next);
            })
            .taskPromise(function () {
                console.logWithTime('检查验证结果');
                return configs.client.verifyChallenge(authz, challenge);
            })
            .taskPromise(function () {
                console.logWithTime('提交验证结果');
                return configs.client.completeChallenge(challenge);
            })
            .taskPromise(function () {
                console.logWithTime('等待验证状态');
                return configs.client.waitForValidStatus(challenge);
            })
            .task(function (next) {
                console.logWithTime('验证成功');
                finshChallenge(authz, challenge, next);
            })
            .serial(callback);
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
                var timer = time.setInterval(function () {
                    if (timer.elapsedTime > configs.dnsVerifyWaitTime) {
                        time.clearInterval(timer);
                        console.pointEnd();
                        return next();
                    }

                    var remainTime = configs.dnsVerifyWaitTime - timer.elapsedTime;
                    console.point('等待 DNS 记录生效，倒计时 ' + parseInt(remainTime / 1000) + ' 秒');
                }, 1000, true);
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

