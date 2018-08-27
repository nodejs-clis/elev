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

/**
 * worker
 * @param args
 * @param params
 */
module.exports = function (args, params) {
    var param0 = params[0];

    if(/^\d$/.test(param0)) {
        mater.worker(number.parseInt(param0, 0));
    } else {
        console.errorWithTime('输入正确的 ID 号');
        console.errorWithTime('可以先执行 elev cron status 查看当的运行状态');
    }
};


