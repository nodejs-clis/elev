/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-19 14:56
 * @update 2018-08-19 14:56
 */


'use strict';

var path = require('blear.node.path');
var nodemailer = require('nodemailer');
var fs = require('fs-extra');

var domainConfigs = require('../utils/domain-configs');

module.exports = function (domain, err) {
    var configs = domainConfigs.get(domain);

    if(!configs) {
        return;
    }


};


