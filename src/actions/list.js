/**
 * 列出域名
 * @author ydr.me
 * @create 2018-08-18 16:39
 * @update 2018-08-18 16:39
 */


'use strict';

var console = require('blear.node.console');
var string = require('blear.utils.string');

var getDomains = require('../utils/get-domains');

/**
 * 列出域名
 * @param args
 * @param method
 */
module.exports = function (args, method) {
    var list = getDomains();
    var length = list.length;
    var size = Math.max(length.toString().length, 2);

    list = list.map(function (domain, index) {
        var key = string.padStart(index + 1, size, '0');
        return key + '. ' + domain;
    });
    console.logWithTime('当前已配置的域名');
    console.log(list.join('\n'));
};


