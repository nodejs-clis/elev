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

/**
 * 生成配置文件
 * @param args
 * @param args.debug
 * @param args.domain
 * @param args.force
 * @param method
 */
module.exports = function (args, method) {
    var file = path.join(
        constant.DOMAINS_DIRNAME,
        args.domain + '.json'
    );

    if (path.isExist(file) && !args.force) {
        console.errorWithTime(file);
        console.errorWithTime('配置文件已存在，如需覆盖请添加 `--force, -f` 参数');
        return;
    }

    console.infoWithTime(file);

    try {
        delete args.force;
        var obj = object.assign(true, {}, defaults, args);
        var json = JSON.stringify(obj, null, 4) + '\n';

        if (args.debug) {
            console.logWithTime('配置信息');
            console.log(json);
        }

        fse.outputFileSync(file, json);
        console.infoWithTime('配置文件生成成功');
    } catch (err) {
        console.errorWithTime('配置文件生成失败');
        console.errorWithTime(err.message);
        process.exit(1);
    }
};


