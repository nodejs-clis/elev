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
    accessKeyId: {
        alias: ['a'],
        default: example.accessKeyId,
        describe: '阿里云 RAM 用户 AK',
        type: 'string'
    },
    accessKeySecret: {
        alias: ['s'],
        default: example.accessKeySecret,
        describe: 'see https://help.aliyun.com/document_detail/28637.html',
        type: 'string'
    },
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
    certificateKeyFileName: {
        default: example.certificateKeyFileName,
        alias: 'k',
        describe: '证书 KEY 文件名',
        type: 'string',
        transform: function (val, options) {
            return string.assign(val, {
                domain: options.domain
            });
        }
    },
    certificateCertFileName: {
        default: example.certificateCertFileName,
        alias: 'p',
        describe: '证书 PEM 文件名',
        type: 'string',
        transform: function (val, options) {
            return string.assign(val, {
                domain: options.domain
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
    aterSaveCommand: {
        alias: 'e',
        default: example.aterSaveCommand,
        describe: '证书保存后的执行命令，请确保有执行权限',
        type: 'string'
    }
};

exports.action = function (options) {
    console.log('init', options);
};


