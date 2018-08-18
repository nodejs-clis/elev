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

// 域名文件夹
exports.DOMAIN_FOLDER = 'domains';

// 定时任务文件名
exports.CRON_FILENAME = 'cron.json';

//  At 3:00 AM, every 20 days
exports.CRON_SCHEDULE = '0 0 3 1/20 * ? *';

// 子进程 PID 文件名
exports.WORKER_FILENAME = 'worker.json';
