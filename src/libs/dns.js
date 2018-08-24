/**
 * dns 检查
 * @author ydr.me
 * @create 2018-08-23 18:25
 * @update 2018-08-23 18:25
 */


'use strict';

var dns = require('dns');
var plan = require('blear.utils.plan');
var random = require('blear.utils.random');
var console = require('blear.node.console');
var request = require('blear.node.request');

var wait = require('../utils/wait');

var prefix = '_acme-challenge.';


/**
 * NDS 重试检查
 * @param configs
 * @param configs.domain
 * @param configs.debug
 * @param configs.dnsMaxCheckTimes
 * @param record
 * @param callback
 */
module.exports = function (configs, record, callback) {
    var dnsMaxCheckTimes = configs.dnsMaxCheckTimes;

    console.logWithTime('将会进行最多', dnsMaxCheckTimes, '次的 DNS TXT 记录检查');

    plan
        .each(new Array(dnsMaxCheckTimes), function (index, b, next) {
            check(index, configs, record, next);
        })
        .serial()
        .try(function () {
            console.errorWithTime('未检查匹配的 DNS TXT 记录');
            callback(new Error('未检查匹配的 DNS TXT 记录'));
        })
        .catch(function () {
            callback();
        });
};


/**
 * 延时检查
 * @param index
 * @param configs
 * @param record
 * @param callback
 */
function check(index, configs, record, callback) {
    var timeout = random.number(19, 59);
    var hostname = prefix + configs.domain;

    plan
        .task(function (next) {
            wait.countdown(timeout, '延时等待 %d 秒后检查', next);
        })
        // .task(function (next) {
        //     dns.resolveTxt(hostname, function (err, records) {
        //         records = records || [];
        //
        //         if (records.indexOf(record) > -1) {
        //             console.logWithTime('第', (index + 1), '次检查', '成功匹配');
        //             return next(new Error('found'));
        //         }
        //
        //         console.logWithTime('第', (index + 1), '次检查', '未匹配到');
        //         next();
        //     });
        // })
        .task(function (next) {
            request({
                url: 'https://www.sslforfree.com/create',
                query: {
                    dns_txt_verify: hostname
                },
                debug: configs.debug
            }, function (err, records) {
                records = records || '';

                if (records.indexOf(record) > -1) {
                    console.logWithTime('第', (index + 1), '次检查', '匹配成功');
                    return next(new Error('found'));
                }

                console.logWithTime('第', (index + 1), '次检查', '匹配失败');
                next();
            });
        })
        .serial(callback);
}

