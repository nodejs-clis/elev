/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var cli = require('/Users/cloudcome/development/github-blearjs/blear.node.cli');
var path = require('blear.node.path');
var string = require('blear.utils.string');

var example = require('../settings/example.com.json');

cli
    .command('init', '初始化配置文件')
    .helper()
    .option('email', {
        alias: ['e'],
        default: example.email,
        describe: '域名联系邮箱',
        type: 'string'
    })
    .option('debug', {
        default: example.debug,
        alias: 'D',
        describe: '是否调试模式，将会打印更加详细的日志',
        type: 'boolean'
    })
    .option('domain', {
        alias: ['d'],
        default: example.domain,
        describe: '域名，仅支持单域名的泛域名证书',
        type: 'string',
        required: true
    })
    .option('dnsRefreshSeconds', {
        alias: ['f'],
        default: example.dnsRefreshSeconds,
        describe: 'DNS 刷新秒数',
        type: 'number'
    })
    .option('dnsServerName', {
        alias: ['n'],
        default: example.dnsServerName,
        describe: 'DNS 服务商，目前仅支持阿里云',
        type: 'string'
    })
    .option('dnsServerAccessKey', {
        alias: ['a'],
        default: example.dnsServerAccessKey,
        describe: '阿里云 RAM 用户 AK',
        type: 'string'
    })
    .option('dnsServerAccessSecret', {
        alias: ['s'],
        default: example.dnsServerAccessSecret,
        describe: 'see <https' + '' + '://help.aliyun.com/document_detail/28637.html>',
        type: 'string'
    })
    .option('certificateKeyFileName', {
        default: example.certificateKeyFileName,
        alias: 'k',
        describe: '证书 KEY 文件名',
        type: 'string',
        transform: function (val, args, method) {
            return string.assign(val, {
                domain: args.domain
            });
        }
    })
    .option('certificateCertFileName', {
        default: example.certificateCertFileName,
        alias: 'p',
        describe: '证书 PEM 文件名',
        type: 'string',
        transform: function (val, args, method) {
            return string.assign(val, {
                domain: args.domain
            });
        }
    })
    .option('saveDirname', {
        default: example.saveDirname,
        alias: 'r',
        describe: '证书保存路径，请确保有该目录读写权限',
        type: 'string',
        coerce: path.resolve
    })
    .option('afterSaveCommand', {
        alias: 'e',
        default: example.afterSaveCommand,
        describe: '证书保存后的执行命令，请确保有执行权限',
        type: 'string'
    })
    .option('force', {
        alias: 'f',
        describe: '强制覆盖已存在的配置文件',
        type: 'boolean'
    })
    .action(require('../actions/init'));
