/**
 * 签证
 * @author ydr.me
 * @create 2018-08-17 17:23
 * @update 2018-08-17 17:23
 */


'use strict';

var plan = require('blear.utils.plan');
var console = require('blear.node.console');

var issue = require('./issue');
var save = require('./save');
var exec = require('./exec');


/**
 * 签证
 * @param configs
 * @param configs.debug
 */
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
        .serial();
};



