/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-17 17:40
 * @update 2018-08-17 17:40
 */


'use strict';

var console = require('blear.node.console');
var path = require('blear.node.path');
var fs = require('fs');

/**
 * 生成配置文件
 * @param configs
 * @param configs.domain
 */
module.exports = function (configs) {
    var json = JSON.stringify(configs, null, 4) + '\n';
    var file = path.join(process.cwd(), configs.domain + '.json');

    try {
        fs.writeFileSync(file, json);
        console.info('配置文件生成成功');
        console.info(file);
    } catch (err) {
        console.error('配置文件生成失败');
        console.error(file);
        console.error(err.message);
        process.exit(1);
    }
};


