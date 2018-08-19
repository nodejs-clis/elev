/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-17 17:40
 * @update 2018-08-17 17:40
 */


'use strict';

var console = require('blear.node.console');
var path = require('blear.node.path');
var object = require('blear.utils.object');
var typeis = require('blear.utils.typeis');

var constant = require('../settings/constant');
var defaults = require('../settings/example.com.json');
var domainConfigs = require('../utils/domain-configs');

/**
 * 生成配置文件
 * @param args
 * @param args.debug
 * @param args.domain
 * @param args.reference
 * @param args.force
 * @param method
 */
module.exports = function (args, method) {
    var domain = args.domain;
    var file = domainConfigs.file(domain);
    var reference = null;

    console.logWithTime(file);

    if (path.isExist(file) && !args.force) {
        console.errorWithTime('配置文件已存在，如需覆盖请添加 `--force, -f` 参数');
        return;
    }

    // 参考配置
    if (args.reference) {
        try {
            reference = domainConfigs.get(args.reference);
        } catch (err) {
            console.errorWithTime('参考配置文件获取失败');
            console.errorWithTime(err.message);
            return;
        }
    }

    try {
        delete args.force;
        var configs = object.assign(true, {}, defaults, args);

        if (reference) {
            from(configs, reference, [
                'dnsServerName',
                'dnsServerAccessKey',
                'dnsServerAccessSecret',
                'saveDirname',
                'afterSaveCommand'
            ]);
            from(configs.smtp, reference.smtp, [
                'from',
                'to',
                'subject',
                'host',
                'port',
                'user',
                'pass'
            ]);
        }

        domainConfigs.set(args.domain, configs);

        if (args.debug) {
            console.logWithTime('配置信息');
            console.log(configs);
        }

        console.infoWithTime('配置文件生成成功');
    } catch (err) {
        console.errorWithTime('配置文件生成失败');
        console.errorWithTime(err.message);
        process.exit(1);
    }
};


/**
 * 来自
 * @param a
 * @param b
 * @param list
 */
function from(a, b, list) {
    list.forEach(function (item) {
        if (a[item] === '') {
            a[item] = b[item];
        }
    });
}

