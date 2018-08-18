/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var path = require('blear.node.path');
var string = require('blear.utils.string');

var example = require('../templates/example.com.json');

exports.command = 'init';

exports.describe = '初始化配置文件';

exports.helper = true;

exports.options = {
    email: {
        alias: ['e'],
        default: example.email,
        describe: '域名联系邮箱',
        type: 'string'
    },
    debug: {
        default: example.debug,
        alias: 'D',
        describe: '是否调试模式，将会打印更加详细的日志',
        type: 'boolean'
    },
    domain: {
        alias: ['d'],
        default: example.domain,
        describe: '域名，仅支持单域名的泛域名证书',
        type: 'string',
        required: true
    },
    dnsRefreshSeconds: {
        alias: ['f'],
        default: example.dnsRefreshSeconds,
        describe: 'DNS 刷新秒数',
        type: 'number'
    },
    dnsServerName: {
        alias: ['n'],
        default: example.dnsServerName,
        describe: 'DNS 服务商，目前仅支持阿里云',
        type: 'string'
    },
    dnsServerAccessKey: {
        alias: ['a'],
        default: example.dnsServerAccessKey,
        describe: '阿里云 RAM 用户 AK',
        type: 'string'
    },
    dnsServerAccessSecret: {
        alias: ['s'],
        default: example.dnsServerAccessSecret,
        describe: 'see <https' + '' + '://help.aliyun.com/document_detail/28637.html>',
        type: 'string'
    },
    certificateKeyFileName: {
        default: example.certificateKeyFileName,
        alias: 'k',
        describe: '证书 KEY 文件名',
        type: 'string',
        transform: function (val, args, method, methods) {
            return string.assign(val, {
                domain: args.domain
            });
        }
    },
    certificateCertFileName: {
        default: example.certificateCertFileName,
        alias: 'p',
        describe: '证书 PEM 文件名',
        type: 'string',
        transform: function (val, args, method, methods) {
            return string.assign(val, {
                domain: args.domain
            });
        }
    },
    saveDirname: {
        default: example.saveDirname,
        alias: 'r',
        describe: '证书保存路径，请确保有该目录读写权限',
        type: 'string',
        coerce: path.resolve
    },
    afterSaveCommand: {
        alias: 'e',
        default: example.afterSaveCommand,
        describe: '证书保存后的执行命令，请确保有执行权限',
        type: 'string'
    }
};

exports.action = require('../actions/init');


