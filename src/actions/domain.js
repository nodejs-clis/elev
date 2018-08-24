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
var shell = require('../utils/shell');

var domainRE = /^[a-z\d][a-z\d-]*(\.[a-z]{2,})+/;

/**
 * 生成配置文件
 * @param args
 * @param args.debug
 * @param args.domain
 * @param args.reference
 * @param args.force
 * @param args.smtp
 * @param domain
 */
module.exports = function (args, domain) {
    if (!domain) {
        listDomain();
        return;
    }

    console.logWithTime('当前域名', domain);

    if (!domainRE.test(domain)) {
        console.errorWithTime(domain, '似乎不是一个合法的域名');
        return;
    }

    var file = domainConfigs.file(domain);
    var editMode = path.isExist(file);
    var newMode = !editMode;
    var reference = null;
    var force = args.force;

    console.logWithTime(file);

    // 参考配置
    if (args.reference) {
        console.infoWithTime('参考域名', args.reference);

        if (!domainRE.test(args.reference)) {
            console.errorWithTime(args.reference, '似乎不是一个合法的域名');
            return;
        }

        try {
            reference = domainConfigs.get(args.reference);
        } catch (err) {
            console.errorWithTime('参考域名的配置文件获取失败', args.reference);
            console.errorWithTime(err.message);
            return;
        }

        if (editMode && !force) {
            console.errorWithTime('当前域名配置文件已存在');
            console.errorWithTime('如需覆盖请添加 `--force, -f` 参数');
            return;
        }
    }
    // 无参考
    else {
        // 新建模式
        if (newMode) {
            var domains = getDomains(domain);

            if (domains.length > 0) {
                console.warnWithTime('当前你已配置了其他域名');
                console.warnWithTime('使用 `elev domain` 列出当前已配置的域名');
                console.warnWithTime('可以使用 `--reference, -r` 参数参考已配置好的域名配置文件');
            }
        }
    }

    generate(args, domain, reference);
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

/**
 * vim 打开编辑
 * @param file
 */
function vim(file) {
    setTimeout(function () {
        shell('vim ' + file, {
            stdio: 'inherit'
        });
    }, 500);
}


function listDomain() {
    var list = getDomains();
    var length = list.length;
    var size = Math.max(length.toString().length, 2);

    list = list.map(function (domain, index) {
        var key = string.padStart(index + 1, size, '0');
        return key + '. ' + domain;
    });
    console.logWithTime('当前已配置的域名');
    console.log(list.join('\n'));
}


/**
 * 生成配置文件
 * @param args
 * @param domain
 * @param reference
 */
function generate(args, domain, reference) {
    try {
        var configs = object.assign(true, {}, defaults, args);

        configs.certificateKeyFileName = string.assign(configs.certificateKeyFileName, {
            domain: domain
        });
        configs.certificateCertFileName = string.assign(configs.certificateCertFileName, {
            domain: domain
        });

        if (reference) {
            from(configs, reference, [
                'emailAddress',
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
    }
}
