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

var visa = require('./visa');
var constant = require('../settings/constant');

// [
//   node
//   script
//   domain
//   workerPid
// ]
var args = process.argv.slice(2);
var domain = args[0];
var daemonPid = number.parseInt(args[1], 0);
var startDate = new Date();
var workerPid = process.pid;

process.env[constant.SLAVE_ENV] = true;
visa(domain, function (err) {
    var endDate = new Date();
    var history = {
        domain: domain,
        startTime: startDate.toString(),
        endTime: endDate.toString(),
        daemonPid: daemonPid,
        workerPid: workerPid,
        error: err ? err.message : ''
    };

    console.logWithTime('读取 worker 配置文件');

    try {
        var workerInfo = fse.readJSONSync(constant.WORKER_FILEPATH);
    } catch (err) {
        console.errorWithTime('读取 worker 配置文件失败');
        console.errorWithTime(err.message);
        console.errorWithTime(constant.WORKER_FILEPATH);
        return process.exit(1);
    }

    workerInfo.workHistories.push(history);
    workerInfo.workTimes++;
    console.logWithTime('写入 worker 配置文件');

    try {
        fse.writeJSONSync(constant.WORKER_FILEPATH, workerInfo);
    } catch (err) {
        console.errorWithTime('写入 worker 配置文件失败');
        console.errorWithTime(err.message);
        console.errorWithTime(constant.WORKER_FILEPATH);
        return process.exit(1);
    }
});
