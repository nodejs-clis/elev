/**
 * cron
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var cli = require('blear.node.cli');

cli
    .command('email', '域名通知邮件测试')
    .option('domain', {
        alias: ['d'],
        default: '',
        descritption: '你需要测试的域名',
        type: 'string',
        required: true
    })
    .helper()
    .action(require('../actions/email'));

