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
 */
module.exports = function (config, keyBf, pemBf) {
    var file = path.join(config.saveDirname, config.certificateKeyFileName);

    console.infoWithTime(file);
    try {
        fse.outputFileSync(
            file,
            keyBf
        );
        console.infoWithTime('文件保存成功');
    } catch (err) {
        console.errorWithTime('文件保存失败');
        console.errorWithTime(err.message);
        process.exit(1);
    }

    file = path.join(config.saveDirname, config.certificateCertFileName);
    console.infoWithTime(file);
    try {
        fse.outputFileSync(
            path.join(config.saveDirname, config.certificateCertFileName),
            pemBf
        );
        console.infoWithTime('文件保存成功');
    } catch (err) {
        console.errorWithTime('文件保存失败');
        console.errorWithTime(err.message);
        process.exit(1);
    }
};


