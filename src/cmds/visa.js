/**
 * visa command
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var cli = require('blear.node.cli');
var path = require('blear.node.path');


cli
    .command('visa', '签发一张 Let’s Encrypt 泛域名证书')
    .option('domain', {
        alias: 'd',
        required: true,
        type: 'string',
        describe: '指定签发域名'
    })
    .option('debug', {
        type: 'boolean',
        describe: '是否调试模式，调试模式会打印更多信息'
    })
    .helper()
    .action(require('../actions/visa'));

