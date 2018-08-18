/**
 * 定时任务状态
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var master = require('../libs/master');

/**
 * 定时任务状态
 * @param args
 * @returns {*}
 */
module.exports = function (args) {
    master.status();
};
