/**
 * cron
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var cli = require('/Users/cloudcome/development/github-blearjs/blear.node.cli');

cli
    .command('email', '域名通知邮件测试')
    .helper()
    .option('domain', {
        alias: ['d'],
        default: '',
        describe: '你需要测试的域名',
        type: 'string',
        required: true
    })
    .action(require('../actions/email'));

