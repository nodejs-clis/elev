/**
 * 执行命令
 * @author ydr.me
 * @create 2018-08-23 15:06
 * @update 2018-08-23 15:06
 */


'use strict';

var execSync = require('child_process').execSync;
var object = require('blear.utils.object');

/**
 * 执行命令
 * @param command
 * @returns {{stdout: string, stderr: string, status: number, code: number, exitCode: number}}
 */
module.exports = function (command, options) {
    var result = {
        stdout: '',
        stderr: '',
        status: 0,
        code: 0,
        exitCode: 0
    };
    var defaults = {
        cwd: process.cwd(),
        env: process.env
    };
    options = object.assign(defaults, options);

    try {
        result.stdout = execSync(command, options).toString();
    } catch (err) {
        result.status = result.exitCode = result.code = err.status || 1;
        result.error = err;
        result.stderr = err.message;
    }

    return result;
};


