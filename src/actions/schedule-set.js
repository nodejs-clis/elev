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

/**
 * 定时任务计划
 * @param args
 * @param args.expression
 * @param args.description
 * @param params
 * @returns {*}
 */
module.exports = function (args, params) {
    console.warnWithTime('定时任务计划表达式的时区是 UTC 时间');

    var rule = args.expression;
    var sched = later.parse.text(rule);
    var list = later.schedule(sched).next(10);

    if (!typeis.Array(list)) {
        console.errorWithTime(rule);
        console.errorWithTime('定时任务计划表达式有误，请按照 later 模块官网进行操作');
        console.errorWithTime('http://bunkat.github.io/later/parsers.html#text');
        return;
    }

    var table = [
        ['#', 'UTC 时间', '本地时间']
    ];

    list.forEach(function (d, i) {
        table.push([
            '第' + string.padStart(i + 1, 2, '0') + '次',
            d,
            date.format(constant.DATE_FORMAT, d)
        ]);
    });

    console.logWithTime('近 10 次的执行时间');
    console.table(table, {
        thead: true
    });

    schedule.set({
        expression: rule,
        description: args.description || '用户自定义',
        default: false,
        createAt: date.format(constant.DATE_FORMAT)
    });
    console.infoWithTime('自定义定时任务计划设置成功');
};
