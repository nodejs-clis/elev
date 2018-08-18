/**
 * 保存 key、pem 文件
 * @author ydr.me
 * @create 2018-08-17 17:19
 * @update 2018-08-17 17:19
 */


'use strict';

var fse = require('fs-extra');
var path = require('blear.node.path');
var console = require('blear.node.console');

/**
 * 保存文件
 * @param config
 * @param keyBf
 * @param pemBf
 * @param callback
 */
module.exports = function (config, keyBf, pemBf, callback) {
    var file = path.join(config.saveDirname, config.certificateKeyFileName);

    console.logWithTime(file);
    try {
        fse.outputFileSync(
            file,
            keyBf
        );
        console.logWithTime('文件保存成功');
    } catch (err) {
        console.errorWithTime('文件保存失败');
        console.errorWithTime(err.message);
        return callback(err);
    }

    file = path.join(config.saveDirname, config.certificateCertFileName);
    console.logWithTime(file);
    try {
        fse.outputFileSync(
            path.join(config.saveDirname, config.certificateCertFileName),
            pemBf
        );
        console.logWithTime('文件保存成功');
    } catch (err) {
        console.errorWithTime('文件保存失败');
        console.errorWithTime(err.message);
        return callback(err);
    }

    callback();
};


