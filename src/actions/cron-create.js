/**
 * 创建定时任务
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var path = require('blear.node.path');
var console = require('blear.node.console');
var fse = require('fs-extra');

var constant = require('../settings/constant');
var pkg = require('../../package');

/**
 * 创建定时任务
 * @param args
 * @returns {*}
 */
module.exports = function (args) {
    var domainFile = path.join(
        constant.DOMAINS_DIRNAME,
        args.domain + '.json'
    );

    console.logWithTime('读取域名配置文件');
    console.logWithTime(domainFile);

    if (!path.isExist(domainFile)) {
        console.errorWithTime('`' + args.domain + '` 域名配置文件不存在');
        console.errorWithTime(domainFile);
        return process.exit(1);
    }

    console.logWithTime('读取定时任务配置文件');
    console.logWithTime(constant.CRON_FILEPATH);

    try {
        var json = fse.readJSONSync(constant.CRON_FILEPATH);
    } catch (err) {
        json = {};
    }

    json.createAt = new Date().toString();
    json.version = pkg.version;
    json.cronList = json.cronList || [];
    json.cronList.push({
        configFile: domainFile,
        schedule: constant.CRON_SCHEDULE
    });

    // 用常驻子进程去运行
    console.log(json);
};
