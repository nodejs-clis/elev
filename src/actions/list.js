/**
 * 列出域名
 * @author ydr.me
 * @create 2018-08-18 16:39
 * @update 2018-08-18 16:39
 */


'use strict';

var path = require('blear.node.path');
var console = require('blear.node.console');
var string = require('blear.utils.string');

var constant = require('../settings/constant');

/**
 * 列出域名
 * @param args
 * @param method
 */
module.exports = function (args, method) {
    var list = path.glob('*.json', {
        srcDirname: constant.DOMAINS_DIRNAME
    });
    var length = list.length;
    var size = Math.max(length.toString().length, 2);

    list = list.map(function (filename, index) {
        var key = string.padStart(index + 1, size, '0');
        return key + '. ' + path.basename(filename).replace(/\.json$/i, '');
    });
    console.logWithTime('当前已配置的域名');
    console.log(list.join('\n'));
};


