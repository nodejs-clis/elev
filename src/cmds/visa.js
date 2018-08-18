/**
 * visa command
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var cli = require('/Users/cloudcome/development/github-blearjs/blear.node.cli');
var path = require('blear.node.path');


cli
    .command('visa', '签发一张 Let’s Encrypt 泛域名证书')
    .helper()
    .option('domain', {
        alias: 'd',
        required: true,
        type: 'string',
        describe: '指定签发域名'
    })
    .action(require('../actions/visa'));

