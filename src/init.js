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

var constant = require('./constant');

/**
 * 生成配置文件
 * @param configs
 * @param configs.debug
 * @param configs.domain
 */
module.exports = function (configs) {
    var json = JSON.stringify(configs, null, 4) + '\n';
    var dirname = process.env.HOME;
    var file = path.join(dirname, constant.CONFIG_FOLDER_NAME, 'domain', configs.domain + '.json');

    if (configs.debug) {
        console.logWithTime('配置信息');
        console.logWithTime(configs);
    }

    console.infoWithTime(file);

    try {
        fse.outputFileSync(file, json);
        console.infoWithTime('配置文件生成成功');
    } catch (err) {
        console.errorWithTime('配置文件生成失败');
        console.errorWithTime(err.message);
        process.exit(1);
    }
};


