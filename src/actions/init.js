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
var string = require('blear.utils.string');

var constant = require('../settings/constant');
var defaults = require('../settings/example.com.json');
var domainConfigs = require('../utils/domain-configs');
var getDomains = require('../utils/get-domains');

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
            console.infoWithTime('参考域名', args.reference);
        } catch (err) {
            console.errorWithTime('参考配置文件获取失败');
            console.errorWithTime(err.message);
            return;
        }
    } else {
        var domains = getDomains(domain);

        if (domains.length > 0) {
            console.warnWithTime('当前你已配置了其他域名');
            console.warnWithTime('可以使用 --reference, -r 参数参考已配置好的域名配置文件');
        }
    }

    try {
        delete args.force;
        var configs = object.assign(true, {}, defaults, args);

        configs.certificateKeyFileName = string.assign(configs.certificateKeyFileName, {
            domain: domain
        });
        configs.certificateCertFileName = string.assign(configs.certificateCertFileName, {
            domain: domain
        });

        if (reference) {
            from(configs, reference, [
                'email',
                'country',
                'state',
                'locality',
                'organization',
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
                'secure',
                'user',
                'pass'
            ]);
        }

        domainConfigs.set(args.domain, configs);
        console.logWithTime('配置信息');
        console.log(configs);
        console.infoWithTime('配置文件生成成功');
    } catch (err) {
        console.errorWithTime('配置文件生成失败');
        console.errorWithTime(err.message);
        process.exit(1);
    }
};


/**
 * 来自
 * @param to
 * @param from
 * @param list
 */
function from(to, from, list) {
    list.forEach(function (key) {
        to[key] = from[key];
    });
}

