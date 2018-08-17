/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var path = require('blear.node.path');

var visa = require('../src/visa');

exports.command = 'visa';

exports.describe = '签发一张 Let’s Encrypt 泛域名证书';

exports.options = {
    config: {
        alias: 'c',
        required: true,
        type: 'string',
        transform: function (val, options) {
            if (!val) {
                return '';
            }

            return path.resolve(val);
        },
        describe: '指定配置文件'
    }
};

exports.action = function (options) {
    visa(require(options.config));
};


