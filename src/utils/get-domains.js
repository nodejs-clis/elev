/**
 * 获取域名列表
 * @author ydr.me
 * @create 2018-08-18 19:00
 * @update 2018-08-18 19:00
 */


'use strict';

var path = require('blear.node.path');

var constant = require('../settings/constant');

/**
 * 当前已配置的域名列表
 * @returns {(void | string)[]}
 */
module.exports = function () {
    return path.glob('*.json', {
        srcDirname: constant.DOMAINS_DIRNAME
    }).map(function (filename) {
        return path.basename(filename).replace(/\.json$/i, '');
    });
};


