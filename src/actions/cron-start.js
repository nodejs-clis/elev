/**
 * 启动定时任务
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var master = require('../libs/master');

/**
 * 启动定时任务
 * @param args
 * @returns {*}
 */
module.exports = function (args) {
    master.start();
    master.status();
};
