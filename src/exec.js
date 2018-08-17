/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-17 17:28
 * @update 2018-08-17 17:28
 */


'use strict';

var console = require('blear.node.console');
var shell = require('shelljs');

/**
 * 执行命令
 * @param configs
 */
module.exports = function (configs) {
    var command = configs.afterSaveCommand;

    if (shell.exec(command).code !== 0) {
        console.error('命令执行失败，请手动执行后续操作');
        console.error(command);
        process.exit(1);
    }
};

