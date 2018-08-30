/**
 * 获取域名列表
 * @author ydr.me
 * @create 2018-08-18 19:00
 * @update 2018-08-18 19:00
 */


'use strict';

var path = require('blear.node.path');
var typeis = require('blear.utils.typeis');
var array = require('blear.utils.array');

var constant = require('../settings/constant');

/**
 * 当前已配置的域名列表
 * @param [exclude] {string | array} 排除
 * @returns {(string)[]}
 */
module.exports = function (exclude) {
    var list = path.glob('*.ini', {
        srcDirname: constant.DOMAINS_DIRNAME
    }).map(function (filename) {
        return path.basename(filename).replace(/\.ini$/i, '');
    });

    if (typeis.Undefined(exclude)) {
        return list;
    }

    return array.delete(list, exclude);
};


