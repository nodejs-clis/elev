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

// 定时任务文件路径
exports.CRON_FILEPATH = path.join(exports.CONFIGS_DIRNAME, 'cron.json');

// 子进程配置文件路径
exports.WORKER_FILEPATH = path.join(exports.CONFIGS_DIRNAME, 'worker.json');

// 每月 1 日凌晨 3 点
exports.CRON_SCHEDULE = '0 19 0 * *';

// worker 环境变量
exports.SLAVE_ENV = '__elev_slave_mode__';

// 日志格式
exports.DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';
