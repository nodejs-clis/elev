/**
 * worker 进程（由 master 进程创建）
 * @author ydr.me
 * @create 2018-08-18 13:53
 * @update 2018-08-18 13:53
 */


'use strict';

var spawn = require('child_process').spawn;
var fse = require('fs-extra');
var date = require('blear.utils.date');
var path = require('blear.node.path');
var plan = require('blear.utils.plan');
var later = require('later');

var constant = require('../settings/constant');
var getDomains = require('../utils/get-domains');

// 每月 1 日凌晨 3 点
var sched = later.parse.cron('0 19 0 * *', false);

// 每 5 分钟
var sched = later.parse.text('every 5 min');

// var list = later.schedule(sched).next(10);
// list.forEach(function (d) {
//     console.log(d, date.format('YYYY-MM-DD HH:mm:ss', d));
// });




later.setInterval(function () {
    var filename = date.format('YYYYMMDD');
    var logFile = path.join(constant.LOGS_DIRNAME, filename + '.log');

    try {
        fse.ensureFileSync(logFile);
    } catch (err) {
        // ignore
    }

    plan
        .each(getDomains(), function (index, domain, next) {
            enslave(logFile, domain, next);
        })
        .serial();
}, sched);

process.on('SIGINT', function () {
    process.exit(1);
});

// ==================================

/**
 * 奴役
 * @param logFile
 * @param domain
 * @param callback
 */
function enslave(logFile, domain, callback) {
    var child = spawn(
        process.execPath,
        [
            require.resolve('./slave.js'),
            domain
        ],
        {
            stdio: [
                // stdio
                'ignore',
                // stdout
                fse.openSync(logFile, 'a'),
                // stderr
                fse.openSync(logFile, 'a')
            ],
            env: process.env,
            cwd: process.cwd()
        }
    );

    child.on('close', function (exitCode) {
        callback();
    });
}
