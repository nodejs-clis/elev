/**
 * 常量配置
 * @author ydr.me
 * @create 2018-08-17 19:02
 * @update 2018-08-17 19:02
 */


'use strict';

var path = require('blear.node.path');

exports.DEBUG = process.env.CLOUDCOME_MAC === 'YES';
exports.DEBUG = true;

// 配置目录
exports.CONFIGS_DIRNAME = path.join(process.env.HOME, '.elev');

// 域名目录
exports.DOMAINS_DIRNAME = path.join(exports.CONFIGS_DIRNAME, 'domains');

// 日志目录
exports.LOGS_DIRNAME = path.join(exports.CONFIGS_DIRNAME, 'logs');

// 定时任务文件路径
exports.CRON_FILEPATH = path.join(exports.CONFIGS_DIRNAME, 'cron.json');

// 子进程配置文件路径
exports.WORKER_FILEPATH = path.join(exports.CONFIGS_DIRNAME, 'worker.json');

// 每月 1 日凌晨 4 点
exports.CRON_SCHEDULE = 'at 20:00 on the last day of the month';
exports.CRON_SCHEDULE_TEXT = '每月 1 日凌晨 4 点';

// worker 环境变量
exports.WORKER_ENV = '__elev_worker_mode__';

// 日志格式
exports.DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';
