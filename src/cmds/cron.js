/**
 * cron
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var cli = require('blear.node.cli');

cli
    .command('cron', '定时任务相关')
    .helper()

    .method('create',
        '创建定时任务，如果不指定域名，\n' +
        '则将当前已配置的所有域名都列入定时任务列表')
    .option('domain', {
        alias: 'd',
        type: 'string',
        required: true,
        describe: '指定域名'
    })

    .method('start', '启动定时任务，默认从此刻开始，每间隔 20 天的凌晨 3 点启动一次')
    .method('status', '查看定时任务状态')
    .method('stop', '停止定时任务')

    .action(require('../actions/cron'))
    .action('create', require('../actions/cron-create'))
    .action('start', require('../actions/cron-start'))
    .action('status', require('../actions/cron-status'))
    .action('stop', require('../actions/cron-stop'));

