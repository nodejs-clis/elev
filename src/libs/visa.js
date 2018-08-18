/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-18 19:31
 * @update 2018-08-18 19:31
 */


'use strict';

var plan = require('blear.utils.plan');
var console = require('blear.node.console');

var issue = require('./issue');
var save = require('./save');
var exec = require('./exec');

module.exports = function (configs) {
    if (configs.debug) {
        console.logWithTime('配置信息');
        console.logWithTime(configs);
    }

    plan
        .task(function (next) {
            issue(configs, next);
        })
        .taskSync(function (com) {
            save(configs, com[0], com[1]);
        })
        .taskSync(function () {
            exec(configs);
        })
        .taskSync(function () {
            console.infoWithTime('证书签发完毕');
        })
        .serial();
};


