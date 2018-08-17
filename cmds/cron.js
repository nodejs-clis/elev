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

exports.action = require('../src/cron');


