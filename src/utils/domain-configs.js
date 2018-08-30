/**
 * 获取域名配置信息
 * @author ydr.me
 * @create 2018-08-19 15:11
 * @update 2018-08-19 15:11
 */


'use strict';

var path = require('blear.node.path');

var constant = require('../settings/constant');
var Conf =  require('./conf');

var conf = new Conf('example.com.ini');
var EXTENSION = '.ini';

/**
 * 配置文件路径
 * @param domain
 * @returns {*}
 */
var getFile = exports.file = function (domain) {
    return path.join(
        constant.DOMAINS_DIRNAME,
        domain + EXTENSION
    );
};

/**
 * 获取域名配置信息
 * @param domain
 * @returns {*}
 */
exports.get = function (domain) {
    return conf.parse(getFile(domain));
};

/**
 * 获取域名配置信息
 * @param domain
 * @param configs
 * @returns {*}
 */
exports.set = function (domain, configs) {
    conf.generate(getFile(domain), configs);
};


/**
 * 获取域名配置信息
 * @param domain
 * @returns {*}
 */
exports.remove = function (domain) {
    conf.remove(getFile(domain));
};



