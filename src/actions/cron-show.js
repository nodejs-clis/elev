/**
 * 定时任务工作列表
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var master = require('../libs/master');

/**
 * 定时任务工作列表
 * @param args
 * @param params
 * @returns {*}
 */
module.exports = function (args, params) {
    master.show(params[0]);
};
