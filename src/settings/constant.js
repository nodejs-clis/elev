/**
 * 常量配置
 * @author ydr.me
 * @create 2018-08-17 19:02
 * @update 2018-08-17 19:02
 */


'use strict';

var path = require('blear.node.path');

// 配置目录
exports.CONFIGS_DIRNAME = path.join(process.env.HOME, '.elev');

// 域名目录
exports.DOMAINS_DIRNAME = path.join(exports.CONFIGS_DIRNAME, 'domains');

// 日志目录
exports.LOGS_DIRNAME = path.join(exports.CONFIGS_DIRNAME, 'logs');

// 定时任务文件名
exports.CRON_FILEPATH = path.join(exports.CONFIGS_DIRNAME, 'cron.json');

// 子进程 PID 文件名
exports.WORKER_FILEPATH = path.join(exports.CONFIGS_DIRNAME,'worker.json');

//  At 3:00 AM, every 20 days
exports.CRON_SCHEDULE = '0 0 3 1/20 * ? *';
