/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-17 17:40
 * @update 2018-08-17 17:40
 */


'use strict';

var console = require('blear.node.console');
var path = require('blear.node.path');
var fse = require('fs-extra');
var object = require('blear.utils.object');

var constant = require('../settings/constant');
var defaults = require('../settings/example.com.json');
var domainConfigs = require('../utils/domain-configs');

/**
 * 生成配置文件
 * @param args
 * @param args.debug
 * @param args.domain
 * @param args.force
 * @param method
 */
module.exports = function (args, method) {
    var domain = args.domain;
    var configs;
    var file = domainConfigs.file(domain);

    try {
        configs = domainConfigs.get(domain);
    } catch (err) {
        // ignore
    }

    console.logWithTime(file);

    if (configs && !args.force) {
        console.errorWithTime('配置文件已存在，如需覆盖请添加 `--force, -f` 参数');
        return;
    }

    try {
        delete args.force;
        configs = object.assign(true, {}, defaults, args);
        domainConfigs.set(args.domain, configs);

        if (args.debug) {
            console.logWithTime('配置信息');
            console.log(configs);
        }

        console.infoWithTime('配置文件生成成功');
    } catch (err) {
        console.errorWithTime('配置文件生成失败');
        console.errorWithTime(err.message);
        process.exit(1);
    }
};


