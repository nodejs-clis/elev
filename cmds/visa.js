/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var path = require('blear.node.path');

exports.command = 'visa';

exports.describe = 'Issue a Let’s Encrypt certificate';

exports.builder = {
    config: {
        alias: 'c',
        demandOption: true,
        type: 'string',
        coerce: path.resolve
    }
};

exports.handler = function (argv) {
    console.log('init', argv);
};


