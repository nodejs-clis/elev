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
    try {
        schedule.remove();
        console.infoWithTime('定时任务描述重置为默认成功');
    } catch (err) {
        console.errorWithTime('定时任务描述重置为默认失败');
        console.errorWithTime(err.message);
    }
};
