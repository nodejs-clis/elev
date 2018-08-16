/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

exports.command = 'send <someone> [message] [options]';

exports.describe = 'send a message to someone';

exports.builder = {
    url: {
        alias: 'u',
        default: 'http://baidu.com/'
    },
    message: {
        alias: 'm',
        type: 'string',
        default: 'hello',
        describe: 'message'
    },
    upperCase: {
        alias: 'c',
        type: 'boolean',
        default: false,
        describe: 'upper case your message'
    }
};

exports.handler = function (argv) {
    console.log('send', argv);
};


