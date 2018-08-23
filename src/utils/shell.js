/**
 * 执行命令
 * @author ydr.me
 * @create 2018-08-23 15:06
 * @update 2018-08-23 15:06
 */


'use strict';

var execSync = require('child_process').execSync;

/**
 * 执行命令
 * @param command
 * @returns {{stdout: string, stderr: string, status: number, code: number, exitCode: number}}
 */
module.exports = function (command) {
    var result = {
        stdout: '',
        stderr: '',
        status: 0,
        code: 0,
        exitCode: 0
    };

    try {
        result.stdout = execSync(command, {
            cwd: process.cwd(),
            env: process.env
        }).toString();
    } catch (err) {
        result.status = result.exitCode = result.code = err.status || 1;
        result.error = err;
        result.stderr = err.message;
    }

    return result;
};


