/**
 * 创建 csr
 * @author ydr.me
 * @create 2018-08-23 15:06
 * @update 2018-08-23 15:06
 */


'use strict';

var console = require('blear.node.console');
var path = require('blear.node.path');
var random = require('blear.utils.random');
var string = require('blear.utils.string');
var fse = require('fs-extra');
var fs = require('fs');

var shell = require('../utils/shell');
var constant = require('../settings/constant');

var sslConfTemplate = fs.readFileSync(path.join(__dirname, '../settings/ssl.conf'), 'utf8');

/**
 * 根据域名配置生成 csr
 * @param configs
 * @returns {[]}
 */
module.exports = function (configs) {
    var conf = string.assign(sslConfTemplate, configs);
    var conFile = generateFile();

    try {
        fs.writeFileSync(conFile, conf, 'utf8');
    } catch (err) {
        console.errorWithTime(conFile);
        console.errorWithTime('生成 openssl req 命令配置文件失败');
        throw err;
    }

    if (configs.debug) {
        console.logWithTime('配置信息');
        console.log(conf);
    }

    var keyFile = generateFile();
    var outFile = generateFile();
    var clean = function () {
        try {
            fs.unlinkSync(conFile);
            fs.unlinkSync(keyFile);
            fs.unlinkSync(outFile);
        } catch (err) {
            // ignore
        }
    };
    var openssl = shell(
        'openssl req' +
        ' -new' +
        ' -utf8' +
        ' -batch' +
        ' -SHA256' +
        ' -newkey rsa:2048' +
        ' -nodes ' +
        ' -keyout ' + keyFile +
        ' -out ' + outFile +
        ' -config ' + conFile
    );

    if (openssl.code !== 0) {
        clean();
        throw new Error(openssl.error);
    }

    var com = [
        fs.readFileSync(keyFile),
        fs.readFileSync(outFile)
    ];

    clean();
    return com;
};

// ==============================

/**
 * 生成一个临时文件
 * @returns {*}
 */
function generateFile() {
    var file = path.join(
        constant.TMP_DIRNAME,
        random.guid()
    );

    try {
        fse.ensureFileSync(file);
    } catch (err) {
        // ignore
    }

    return file;
}


