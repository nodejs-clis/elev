/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var path = require('blear.node.path');
var example = require('../templates/example.com.json');

exports.command = 'init';

exports.describe = '初始化配置文件';

exports.helper = true;

exports.options = {
    name: {
        alias: 'n',
        default: 'example.com.json',
        type: 'string',
        describe: '文件名',
        transform: path.normalize
    },
    accessKeyId: {
        alias: ['ak', 'k'],
        default: example.accessKeyId,
        describe: '阿里云 RAM 用户 AK',
        type: 'string'
    },
    accessKeySecret: {
        alias: ['ks', 's'],
        default: example.accessKeySecret,
        describe: 'see https://help.aliyun.com/document_detail/28637.html',
        type: 'string'
    },
    email: {
        alias: ['mail', 'e'],
        default: example.email,
        describe: '域名联系邮箱',
        type: 'string'
    },
    debug: {
        default: example.debug,
        describe: '是否调试模式，将会打印更加详细的日志',
        type: 'boolean'
    },
    domain: {
        alias: ['d'],
        default: example.domain,
        describe: '域名，仅支持单域名的泛域名证书',
        type: 'string'
    },
    dnsRefreshSeconds: {
        alias: ['f'],
        default: example.dnsRefreshSeconds,
        describe: 'DNS 刷新秒数',
        type: 'number'
    },
    certificateKeyFileName: {
        default: example.certificateKeyFileName,
        describe: '证书 KEY 文件名',
        type: 'string'
    },
    certificateCertFileName: {
        default: example.certificateCertFileName,
        describe: '证书 PEM 文件名',
        type: 'string'
    },
    saveDirname: {
        default: example.saveDirname,
        describe: '证书保存路径，请确保有该目录读写权限',
        type: 'string',
        coerce: path.resolve
    },
    aterSaveCommand: {
        default: example.aterSaveCommand,
        describe: '证书保存后的执行命令，请确保有执行权限',
        type: 'string'
    }
};

exports.action = function (options) {
    console.log('init', options);
};


