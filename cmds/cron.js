/**
 * cron
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var path = require('blear.node.path');

exports.command = 'cron';

exports.describe = '创建定时任务';

exports.helper = true;

exports.options = {
    domain: {
        alias: 'd',
        required: true,
        type: 'string',
        describe: '指定域名'
    }
};

exports.action = require('../src/actions/cron');


