/**
 * 获取域名配置信息
 * @author ydr.me
 * @create 2018-08-19 15:11
 * @update 2018-08-19 15:11
 */


'use strict';

var path = require('blear.node.path');
var fse = require('fs-extra');

var constant = require('../settings/constant');

/**
 * 配置文件路径
 * @param domain
 * @returns {*}
 */
var getFile = exports.file = function (domain) {
    return path.join(
        constant.DOMAINS_DIRNAME,
        domain + '.json'
    );
};

/**
 * 获取域名配置信息
 * @param domain
 * @returns {*}
 */
exports.get = function (domain) {
    return fse.readJSONSync(getFile(domain));
};

/**
 * 获取域名配置信息
 * @param domain
 * @param configs
 * @returns {*}
 */
exports.set = function (domain, configs) {
    fse.outputFileSync(getFile(domain), JSON.stringify(configs, null, 4) + '\n');
};


/**
 * 获取域名配置信息
 * @param domain
 * @returns {*}
 */
exports.remove = function (domain) {
    fse.removeSync(getFile(domain));
};



