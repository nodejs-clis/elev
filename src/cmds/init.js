/**
 * init 命令
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var cli = require('/Users/cloudcome/development/github-blearjs/blear.node.cli');

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
    .option('debug', {
        alias: 'D',
        describe: '是否调试模式，将会打印更加详细的日志',
        type: 'boolean'
    })
    .option('force', {
        alias: 'f',
        describe: '强制覆盖已存在的配置文件',
        type: 'boolean'
    })
    .action(require('../actions/init'));
