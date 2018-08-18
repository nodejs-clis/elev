/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-18 22:32
 * @update 2018-08-18 22:32
 */


'use strict';

var fs = require('fs');


/**
 * 读 JSON
 * @param file
 * @returns {object}
 */
exports.read = function (file) {
    var data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
};


/**
 * 写 JSON
 * @param file
 * @param obj
 */
exports.write = function (file, obj) {
    var json = JSON.stringify(obj);
    return fs.writeFileSync(file, json, 'utf8');
};


