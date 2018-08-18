/**
 * 根据配置文件进行签发
 * @author ydr.me
 * @create 2018-08-18 19:31
 * @update 2018-08-18 19:31
 */


'use strict';

var plan = require('blear.utils.plan');
var console = require('blear.node.console');
var path = require('blear.node.path');
var fse = require('fs-extra');

var constant = require('../settings/constant');
var issue = require('./issue');
var save = require('./save');
var exec = require('./exec');

/**
 * 根据域名进行签发
 * @param domain
 * @param [callback]
 */
module.exports = function (domain, callback) {
    var configFile = path.join(constant.DOMAINS_DIRNAME, domain + '.json');
    var ending = function () {
        console.infoWithTime('Let’s Encrypt 证书签发结束');
        console.infoWithTime('--------------------------');
    };

    console.infoWithTime('--------------------------');
    console.infoWithTime('Let’s Encrypt 证书签发开始');
    console.logWithTime('签发域名', domain);
    console.logWithTime('开始读取配置文件');
    console.logWithTime(configFile);

    if (!path.isExist(configFile)) {
        console.errorWithTime('配置文件不存在');
        ending();
        return;
    }

    try {
        var configs = fse.readJSONSync(configFile);
    } catch (err) {
        console.errorWithTime('配置文件读取失败');
        console.errorWithTime(err.message);
        ending();
        return;
    }

    if (configs.debug) {
        console.logWithTime('配置信息');
        console.logWithTime(configs);
    }

    plan
        .task(function (next) {
            // issue(configs, next);
            setTimeout(function () {
                console.log('>>>>>>>>>模拟签证<<<<<<<<<');
                next(null, [Buffer.from('123'), Buffer.from('456')]);
            }, 1000);
        })
        .task(function (next, com) {
            save(configs, com[0], com[1], next);
        })
        .task(function (next) {
            exec(configs, next);
        })
        .serial(function (err) {
            ending();

            if(callback) {
                callback(err);
            }
        });
};


