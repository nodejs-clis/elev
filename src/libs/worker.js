/**
 * 工作（worker）进程（由 daemon 创建并管理）
 * @author ydr.me
 * @create 2018-08-18 18:30
 * @update 2018-08-18 18:30
 */


'use strict';

var console = require('blear.node.console');
var fse = require('fs-extra');
var number = require('blear.utils.number');
var date = require('blear.utils.date');

var visa = require('./visa');
var constant = require('../settings/constant');
var email = require('./email');

// [
//   node
//   script
//   domain
//   workerPid
//   logFile
// ]
var args = process.argv.slice(2);
var domain = args[0];
var daemonPid = number.parseInt(args[1], 0);
var logFile = args[2];
var startDate = new Date();
var workerPid = process.pid;
var notify = function (err, history) {
    if (err) {
        console.logWithTime('elev 命令执行成功，开始邮件通知');
    } else {
        console.errorWithTime('elev 命令执行异常，开始邮件通知');
    }

    email(domain, err, history, function (err, ret) {
        if (err) {
            console.errorWithTime('邮件通知失败');
            console.errorWithTime(err.message);
            return;
        }

        console.infoWithTime('邮件通知成功');
        ret.accepted.forEach(function (accepted) {
            console.infoWithTime('收件人', accepted);
        });
    });
};

process.env[constant.WORKER_ENV] = true;
visa({domain: domain}, function (err) {
    var endDate = new Date();
    var history = {
        domain: domain,
        startAt: date.format(constant.DATE_FORMAT, startDate),
        endAt: date.format(constant.DATE_FORMAT, endDate),
        daemonPid: daemonPid,
        workerPid: workerPid,
        logFile: logFile,
        error: err ? err.message : ''
    };

    console.logWithTime('读取 worker 配置文件');

    try {
        var workerInfo = fse.readJSONSync(constant.WORKER_FILEPATH);
    } catch (err) {
        console.errorWithTime('读取 worker 配置文件失败');
        console.errorWithTime(err.message);
        console.errorWithTime(constant.WORKER_FILEPATH);
        return;
    }

    history.workerId = workerInfo.workTimes;
    workerInfo.workHistories.push(history);
    workerInfo.workTimes++;
    console.logWithTime('写入 worker 配置文件');

    try {
        fse.writeJSONSync(constant.WORKER_FILEPATH, workerInfo);
    } catch (err) {
        console.errorWithTime('写入 worker 配置文件失败');
        console.errorWithTime(err.message);
        console.errorWithTime(constant.WORKER_FILEPATH);
    }

    notify(err, history);
});

