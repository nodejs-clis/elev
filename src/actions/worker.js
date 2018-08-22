/**
 * worker
 * @author ydr.me
 * @create 2018-08-22 09:11
 * @update 2018-08-22 09:11
 */


'use strict';

var number = require('blear.utils.number');
var console = require('blear.node.console');

var mater = require('../libs/master');

module.exports = function (args, method, params) {
    if(/^\d$/.test(method)) {
        mater.worker(number.parseInt(method, 0));
    } else {
        console.errorWithTime('输入正确的 ID 号');
        console.errorWithTime('可以先执行 elev cron status 查看当的运行状态');
    }
};


