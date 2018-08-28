/**
 * schedule
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var cli = require('blear.node.cli');

cli
    .command('schedule', '定时任务计划相关')
    .helper()
    .action(require('../actions/schedule'))

    .method('show', '展示当前已配置的计划')

    .method('set',  '自定义定时任务计划')
    .option('expression', {
        alias: 'e',
        description: '自定义定时任务计划表达式'
    })
    .option('description', {
        alias: 'd',
        description: '自定义定时任务计划描述'
    })
    .action(require('../actions/schedule-set'))

    .method('reset', '重置为默认的定时任务计划')
    .action(require('../actions/schedule-reset'));

