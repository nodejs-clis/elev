/**
 * email
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var cli = require('blear.node.cli');

cli
    .command('smtp', 'SMTP 相关')
    .option('domain', {
        alias: ['d'],
        default: '',
        description: '你需要测试的域名',
        type: 'string',
        required: true
    })
    .helper()
    .action(require('../actions/smtp'));

