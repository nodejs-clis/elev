/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

exports.command = 'get';

exports.describe = 'make a get HTTP request';

exports.builder = {
    url: {
        alias: 'u',
        default: 'http://yargs.js.org/'
    },
    ssl: {
        alias: 's',
        choices: ['yes', 'no']
    },
    port: {
        alias: 'p',
        type: 'array'
    }
};

exports.handler = function (argv) {
    console.log('get', argv);
};


