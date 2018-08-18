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
var cron = require('node-cron');

var constant = require('../settings/constant');
var getDomains = require('../utils/get-domains');

cron.schedule('* * * * *', function () {
    var filename = date.format('YYYYMMDD');
    var logFile = path.join(constant.LOGS_DIRNAME, filename + '.log');

    try {
        fse.ensureFileSync(logFile);
    } catch (err) {
        // ignore
    }

    var domains = getDomains();

    plan
        .taskSync(function () {

        })
        .each(domains, function (index, domain, next) {
            enslave(logFile, index, domain, next);
        })
        .serial();
});

process.on('SIGINT', function () {
    process.exit(1);
});

// ==================================

/**
 * 奴役
 * @param logFile
 * @param index
 * @param domain
 * @param callback
 */
function enslave (logFile, index, domain, callback) {
    var child = spawn(
        process.execPath,
        [
            require.resolve('./slave.js'),
            index,
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
