/**
 * 守护进程
 * @description 创建可以常驻的子进程用来执行定时任务
 * @author ydr.me
 * @create 2018-08-18 13:33
 * @update 2018-08-18 13:33
 */


'use strict';

var fse = require('fs-extra');
var spawn = require('child_process').spawn;
var path = require('blear.node.path');
var console = require('blear.node.console');

var constant = require('../settings/constant');

var workerFile = path.join(
    constant.CONFIGS_DIRNAME,
    constant.WORKER_FILENAME
);


/**
 * 启动 worker
 */
exports.start = function () {
    var info = getWorkerInfo();

    if (info !== null) {
        return;
    }

    var child = spawn(
        process.execPath,
        [require.resolve('./worker.js')],
        {
            stdio: [
                // stdio
                'ignore',
                // stdout
                'ignore',
                // stderr
                'ignore'
            ],
            env: process.env,
            cwd: process.cwd(),
            detached: true
        }
    );

    child.unref();
    setWorkerInfo(child.pid);
};

/**
 * 状态 worker
 */
exports.status = function () {
    var info = getWorkerInfo();

    if (info === null) {
        console.errorWithTime('当前暂无 elev 定时任务在运行');
        return;
    }

    console.table([
        ['pid', info.pid],
        ['masterPid', info.masterPid],
        ['startTime', info.startTime],
        ['workTimes', info.workTimes]
    ], {
        border: true,
        colors: [
            'green'
        ]
    });
};

/**
 * 停止 worker
 */
exports.stop = function () {
    var info = getWorkerInfo();

    if (info === null) {
        return;
    }

    process.kill(info.pid, 'SIGINT');
    removeWorkerInfo();
};


// ===========================

/**
 * 获取 worker 进程的 pid
 * @returns {*}
 */
function getWorkerInfo() {
    if (!path.isExist(workerFile)) {
        return null;
    }

    try {
        return fse.readJSONSync(workerFile) || null;
    } catch (err) {
        return null;
    }
}

/**
 * 设置 worker pid
 * @param pid
 */
function setWorkerInfo(pid) {
    try {
        fse.writeJSONSync(workerFile, {
            pid: pid,
            masterPid: process.pid,
            startTime: new Date().toString(),
            workTimes: 0
        });
    } catch (err) {
        // ignore
    }
}


/**
 * 移除 worker info
 */
function removeWorkerInfo() {
    try {
        fse.removeSync(workerFile);
    } catch (err) {
        // ignore
    }
}


