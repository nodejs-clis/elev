/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-17 17:28
 * @update 2018-08-17 17:28
 */


'use strict';

var console = require('blear.node.console');
var Error = require('blear.classes.error');
var shell = require('shelljs');

/**
 * 执行命令
 * @param configs
 * @param callback
 */
module.exports = function (configs, callback) {
    var command = configs.afterSaveCommand;

    console.logWithTime(command);

    if (shell.exec(command).code !== 0) {
        console.errorWithTime('命令执行失败，请手动执行后续操作');
        return callback(new Error({
            message: '命令执行失败',
            command: command
        }));
    }

    console.logWithTime('命令执行成功');
    callback();
};

