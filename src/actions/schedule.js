/**
 * 定时任务计划
 * @author ydr.me
 * @create 2018-08-17 18:18
 * @update 2018年08月27日17:31:22
 */


'use strict';

var console = require('blear.node.console');

var schedule = require('../utils/schedule');

/**
 * 定时任务计划
 * @param args
 * @param args.now
 * @param args.set
 * @param args.description
 * @param args.reset
 * @param params
 * @returns {*}
 */
module.exports = function (args, params) {
    var sche = schedule.get();
    var table = [
        ['计划表达式', sche.expression],
        ['计划描述', sche.description],
        ['默认计划', sche.default ? '是' : '否']
    ];

    if (!sche.default) {
        table.push(
            ['创建时间', sche.createAt]
        );
    }

    console.table(table);
};

