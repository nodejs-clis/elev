/**
 * cron
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var cli = require('blear.node.cli');

cli
    .command('cron', '创建定时任务')
    .helper()
    .method('create')
    .option('domain', {
        alias: 'd',
        required: true,
        type: 'string',
        describe: '指定域名'
    })
    .action(require('../actions/cron'));


