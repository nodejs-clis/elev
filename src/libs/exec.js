/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-17 17:28
 * @update 2018-08-17 17:28
 */


'use strict';

var console = require('blear.node.console');
var Error = require('blear.classes.error');

var shell = require('../utils/shell');

/**
 * 执行命令
 * @param configs
 * @param configs.base.afterSaveCommand
 * @param callback
 */
module.exports = function (configs, callback) {
    var command = configs.base.afterSaveCommand;

    console.logWithTime(command);

    var result = shell(command);

    if (result.code !== 0) {
        console.errorWithTime('命令执行失败，请手动执行后续操作');
        return callback(new Error({
            message: '命令执行失败',
            command: command,
            stdout: result.stdout,
            stderr: result.stderr
        }));
    }

    console.logWithTime('命令执行成功');
    callback();
};

