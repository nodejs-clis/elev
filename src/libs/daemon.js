/**
 * 守护（daemon）进程（由 god 进程创建并管理）
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
var schedule = require('../utils/schedule');

// 每月 1 日凌晨 3 点
later.date.localTime();
var sched = later.parse.cron(schedule.get().expression, false);

if (sched.schedules.length === 0) {
    process.exit(1);
}

later.setInterval(function () {
    plan
        .each(getDomains(), function (index, domain, next) {
            var filename = date.format('YYYYMMDD');
            var logFile = path.join(constant.LOGS_DIRNAME, filename + '-' + domain + '.log');

            try {
                fse.ensureFileSync(logFile);
            } catch (err) {
                return next();
            }

            assignWork(logFile, domain, next);
        })
        .serial();
}, sched);

process.on('SIGINT', function () {
    process.exit(1);
});

// ==================================

/**
 * 分配工作
 * @param logFile
 * @param domain
 * @param callback
 */
function assignWork(logFile, domain, callback) {
    var child = spawn(
        process.execPath,
        [
            require.resolve('./worker.js'),
            domain,
            process.pid,
            logFile
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
