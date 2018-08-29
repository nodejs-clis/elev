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
    .action(require('../actions/cron'))

    .method('start', '启动定时任务')
    .action(require('../actions/cron-start'))

    .method('restart', '重新启动定时任务')
    .action(require('../actions/cron-restart'))

    .method('status', '查看定时任务状态')
    .action(require('../actions/cron-status'))

    .method('stop', '停止定时任务')
    .action(require('../actions/cron-stop'));

