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
var number = require('blear.utils.number');

var constant = require('../settings/constant');

var pidFile = path.join(
    constant.CONFIGS_DIRNAME,
    constant.PID_FILENAME
);


/**
 * 确保有一个 worker 来做定时任务，
 * 先判断有没有 pid，如果没有则创建，
 * 如果有，则忽略
 */
exports.ensure = function () {
    var pid = getWorkerPid();

    if (pid !== 0) {
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
    setWorkerPid(child.pid);
};

/**
 * 放弃 worker
 */
exports.drop = function () {
    var pid = getWorkerPid();

    if (pid === 0) {
        return;
    }

    process.kill(pid, 'SIGINT');
};


// ===========================

/**
 * 获取 worker 进程的 pid
 * @returns {*}
 */
function getWorkerPid() {
    if (!path.isExist(pidFile)) {
        return 0;
    }

    try {
        var pid = fse.readFileSync(pidFile);
        return number.parseInt(pid, 0);
    } catch (err) {
        return 0;
    }
}

/**
 * 设置 worker pid
 * @param pid
 */
function setWorkerPid(pid) {
    try {
        fse.outputFileSync(pidFile, pid, 'utf8');
    } catch (err) {
        // ignore
    }
}


