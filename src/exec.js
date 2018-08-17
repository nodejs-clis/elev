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

    console.logWithTime(command);

    if (shell.exec(command).code !== 0) {
        console.errorWithTime('命令执行失败，请手动执行后续操作');
        return process.exit(1);
    }

    console.logWithTime('命令执行成功');
    console.infoWithTime('Let’s Encrypt 证书签发完毕');
};

