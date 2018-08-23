/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-23 18:54
 * @update 2018-08-23 18:54
 */


'use strict';

var console = require('blear.node.console');
var time = require('blear.utils.time');

var constant = require('../settings/constant');

/**
 * loading 开始
 */
exports.loading = function () {
    if (process.env[constant.WORKER_ENV]) {
        return;
    }

    console.loading();
};

/**
 * loading 结束
 */
exports.loadingEnd = function () {
    if (process.env[constant.WORKER_ENV]) {
        return;
    }

    console.loadingEnd();
};


/**
 * 倒计时
 * @param seconds
 * @param tips
 * @param callback
 */
exports.countdown = function (seconds, tips, callback) {
    var waitTime = seconds * 1000;

    if (process.env[constant.WORKER_ENV]) {
        console.logWithTime(console.format(tips, parseInt(waitTime / 1000)));
        setTimeout(callback, waitTime);
        return;
    }

    var timer = time.setInterval(function () {
        if (timer.elapsedTime > waitTime) {
            time.clearInterval(timer);
            console.pointEnd();
            return callback();
        }

        var remainTime = waitTime - timer.elapsedTime;
        console.point(console.format(tips, parseInt(remainTime / 1000)));
    }, 1000, true);
};

