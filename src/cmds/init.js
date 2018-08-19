/**
 * init 命令
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var cli = require('/Users/cloudcome/development/github-blearjs/blear.node.cli');
var path = require('blear.node.path');
var string = require('blear.utils.string');
var number = require('blear.utils.number');

var defaults = require('../settings/example.com.json');

cli
    .command('init', '初始化配置文件')
    .helper()
    .option('domain', {
        alias: ['d'],
        describe: '域名，仅支持单域名的泛域名证书',
        type: 'string',
        required: true
    })
    .option('reference', {
        alias: ['r'],
        describe: '参考已配置好的域名配置文件',
        type: 'string',
        required: false
    })
    .option('email', {
        alias: ['e'],
        describe: '域名联系邮箱',
        type: 'string'
    })
    .option('debug', {
        alias: 'D',
        describe: '是否调试模式，将会打印更加详细的日志',
        type: 'boolean'
    })
    .option('dnsRefreshSeconds', {
        describe: 'DNS 刷新秒数',
        type: 'number',
        default: defaults.dnsRefreshSeconds,
        transform: function (val) {
            return number.parseInt(val, defaults.dnsRefreshSeconds);
        }
    })
    .option('dnsServerName', {
        alias: ['n'],
        describe: 'DNS 服务商，目前仅支持阿里云',
        type: 'string'
    })
    .option('dnsServerAccessKey', {
        alias: ['a'],
        describe: '阿里云 RAM 用户 AK',
        type: 'string'
    })
    .option('dnsServerAccessSecret', {
        alias: ['s'],
        describe: 'see <https' + '' + '://help.aliyun.com/document_detail/28637.html>',
        type: 'string'
    })
    .option('certificateKeyFileName', {
        alias: 'k',
        describe: '证书 KEY 文件名',
        type: 'string',
        default: defaults.certificateKeyFileName,
        transform: function (val, args, method) {
            return string.assign(val, {
                domain: args.domain
            });
        }
    })
    .option('certificateCertFileName', {
        alias: 'p',
        describe: '证书 PEM 文件名',
        type: 'string',
        default: defaults.certificateCertFileName,
        transform: function (val, args, method) {
            return string.assign(val, {
                domain: args.domain
            });
        }
    })
    .option('saveDirname', {
        describe: '证书保存路径，请确保有该目录读写权限',
        type: 'string',
        coerce: path.resolve
    })
    .option('afterSaveCommand', {
        describe: '证书保存后的执行命令，请确保有执行权限',
        type: 'string'
    })
    .option('force', {
        alias: 'f',
        describe: '强制覆盖已存在的配置文件',
        type: 'boolean'
    })
    .action(require('../actions/init'));
