/**
 * worker
 * @author ydr.me
 * @create 2018-08-22 09:11
 * @update 2018-08-22 09:11
 */


'use strict';

var number = require('blear.utils.number');

var mater = require('../libs/master');

module.exports = function (args, method, params) {
    if(/^\d$/.test(method)) {
        mater.worker(number.parseInt(method, 0));
    }
};


