/**
 * 上帝进程
 * @description 创建可以常驻的子进程（daemon）用来执行定时任务
 * @author ydr.me
 * @create 2018-08-18 13:33
 * @update 2018-08-18 13:33
 */


'use strict';

var fse = require('fs-extra');
var spawn = require('child_process').spawn;
var path = require('blear.node.path');
var console = require('blear.node.console');
var array = require('blear.utils.array');
var number = require('blear.utils.number');
var date = require('blear.utils.date');
var later = require('later');

var constant = require('../settings/constant');
var schedule = require('../utils/schedule');


/**
 * 启动 worker
 */
exports.start = function () {
    var info = getWorkerInfo();
    var plan = schedule.get();

    if (info !== null) {
        console.errorWithTime('定时任务正在运行');
        console.errorWithTime('启动周期', plan.description);
        console.errorWithTime('daemonPid', info.daemonPid);
        console.errorWithTime('startAt', info.startAt);
        return;
    }

    start(plan);
};

/**
 * worker 进程信息
 * @type {getWorkerInfo}
 */
exports.info = getWorkerInfo;

/**
 * 状态 worker
 */
exports.status = function () {
    var info = getWorkerInfo();

    if (info === null) {
        console.logWithTime('当前暂无定时任务在运行');
        return;
    }

    var table = [
        ['master pid', info.masterPid],
        ['daemon pid', info.daemonPid],
        ['start at', info.startAt],
        ['domains dirname', constant.DOMAINS_DIRNAME],
        ['logs dirname', constant.LOGS_DIRNAME],
        ['work times', info.workTimes]
    ];

    array.each(info.workHistories, function (index, history) {
        table.push([
            'worker#' + index,
            history.startAt
        ]);
    });

    console.table(table, {
        border: true,
        colors: [
            'green'
        ]
    });
    console.log();
};

/**
 * 展示某次 worker 记录
 * @param index
 */
exports.worker = function (index) {
    var info = getWorkerInfo();

    if (index === undefined) {
        console.errorWithTime('请指定 worker index');
        return;
    }

    if (info === null) {
        console.errorWithTime('当前暂无定时任务在运行');
        return;
    }

    index = number.parseInt(index, 0);
    var history = info.workHistories[index];

    if (!history) {
        console.errorWithTime('worker#' + index + ' 工作记录不存在');
        return;
    }

    var table = [
        ['master pid', info.masterPid],
        ['daemon pid', info.daemonPid],
        ['worker pid', history.workerPid],
        ['start at', history.startAt],
        ['end at', history.endAt],
        ['worker id', index],
        ['work domain', history.domain],
        ['work log', history.logFile],
        ['work error', history.error]
    ];

    console.table(table, {
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
        console.errorWithTime('当前暂无定时任务在运行');
        return;
    }

    stop(info);
};


/**
 * 重新启动
 */
exports.restart = function () {
    var info = getWorkerInfo();
    var plan = schedule.get();

    // 有旧定时任务
    if (info !== null) {
        stop(info);
    }

    start(plan);
};

// ===========================

/**
 * 获取 worker 进程的 pid
 * @returns {*}
 */
function getWorkerInfo() {
    if (!path.isExist(constant.WORKER_FILEPATH)) {
        return null;
    }

    try {
        return fse.readJSONSync(constant.WORKER_FILEPATH) || null;
    } catch (err) {
        return null;
    }
}

/**
 * 设置 worker pid
 * @param pid
 */
function setWorkerInfo(pid) {
    var info = {
        daemonPid: pid,
        masterPid: process.pid,
        startAt: date.format(constant.DATE_FORMAT),
        workTimes: 0,
        // 记录工作历史，包含启动时间，域名列表等信息
        workHistories: []
    };

    try {
        fse.outputJSONSync(constant.WORKER_FILEPATH, info);
    } catch (err) {
        console.errorWithTime('定时任务配置文件保存失败，无法被 elev 自动管理，请手动停止');
        console.errorWithTime('daemonPid', info.daemonPid);
        console.errorWithTime(err.message);
        return null;
    }

    console.infoWithTime('定时任务启动成功');
    console.infoWithTime('启动周期', schedule.get().description);
    console.infoWithTime('daemonPid', info.daemonPid);
    console.infoWithTime('startAt', info.startAt);
    return info;
}


/**
 * 移除 worker info
 */
function removeWorkerInfo() {
    try {
        fse.removeSync(constant.WORKER_FILEPATH);
    } catch (err) {
        // ignore
    }
}


/**
 * 启动
 * @param plan
 */
function start(plan) {
    console.logWithTime('正在检查定时任务计划表达式');

    // 每月 1 日凌晨 3 点
    later.date.localTime();
    var sched = later.parse.cron(plan.expression, false);

    if (sched.schedules.length === 0) {
        console.errorWithTime('定时任务计划表达式有误');
        console.errorWithTime('表达式 `%s`', plan.expression);
        console.errorWithTime('描述', plan.description);
        return;
    }

    console.logWithTime('正在启动定时任务');

    try {
        var child = spawn(
            process.execPath,
            [require.resolve('./daemon.js')],
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
    } catch (err) {
        console.errorWithTime('定时任务启动失败');
        console.errorWithTime(err.message);
        return;
    }

    setWorkerInfo(child.pid);
}


/**
 * 停止
 * @param info
 */
function stop(info) {
    console.logWithTime('正在停止定时任务', info.daemonPid);

    try {
        process.kill(info.daemonPid, 'SIGINT');
    } catch (err) {
        console.errorWithTime('定时任务信号异常，请手动检查');
        console.errorWithTime(err.message);
    }

    removeWorkerInfo();
    console.infoWithTime('定时任务已停止');
}
