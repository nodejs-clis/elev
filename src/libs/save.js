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
 * @param configs
 * @param configs.debug
 * @param configs.base.saveDirname
 * @param configs.base.certificateKeyFileName
 * @param keyBf
 * @param pemBf
 * @param callback
 */
module.exports = function (configs, keyBf, pemBf, callback) {
    var saveDirname = configs.base.saveDirname;
    var certificateKeyFileName = configs.base.certificateKeyFileName;
    var certificateCertFileName = configs.base.certificateCertFileName;
    var file = path.join(saveDirname, certificateKeyFileName);

    console.logWithTime(file);

    if (configs.debug) {
        console.log(keyBf.toString());
    }

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

    file = path.join(saveDirname, certificateCertFileName);
    console.logWithTime(file);

    if (configs.debug) {
        console.log(pemBf.toString());
    }

    try {
        fse.outputFileSync(
            path.join(saveDirname, certificateCertFileName),
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


