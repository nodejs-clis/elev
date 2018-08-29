/**
 * 定时任务计划
 * @author ydr.me
 * @create 2018-08-17 18:18
 * @update 2018年08月27日17:31:22
 */


'use strict';

var console = require('blear.node.console');
var date = require('blear.utils.date');
var typeis = require('blear.utils.typeis');
var string = require('blear.utils.string');
var later = require('later');

var schedule = require('../utils/schedule');
var constant = require('../settings/constant');
var master = require('../libs/master');

/**
 * 定时任务计划
 * @param args
 * @param args.expression
 * @param args.description
 * @param params
 * @returns {*}
 */
module.exports = function (args, params) {
    var expression = args.expression;
    later.date.localTime();
    var sched = later.parse.cron(expression, false);

    if (sched.schedules.length === 0) {
        console.errorWithTime('`%s`', expression);
        console.errorWithTime('定时任务计划表达式有误，请按照 linux crontab 文档进行书写');
        return;
    }

    var list = later.schedule(sched).next(10);
    var table = [
        ['#', '触发时间']
    ];

    list.forEach(function (d, i) {
        table.push([
            '第' + string.padStart(i + 1, 2, '0') + '次',
            date.format(constant.DATE_FORMAT, d)
        ]);
    });

    console.logWithTime('近 10 次的执行时间');
    console.table(table, {
        thead: true
    });

    schedule.set({
        expression: expression,
        description: args.description || '用户自定义',
        default: false,
        createAt: date.format(constant.DATE_FORMAT)
    });
    console.infoWithTime('自定义定时任务计划设置成功');

    var info = master.info();

    if (info === null) {
        return;
    }

    console.warnWithTime('当前有定时任务正在运行，你需要重新启动定时任务才能生效');
};
