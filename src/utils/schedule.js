/**
 * schedule
 * @author ydr.me
 * @create 2018-08-27 17:35
 * @update 2018-08-27 17:35
 */


'use strict';

var fse = require('fs-extra');

var constant = require('../settings/constant');

/**
 * 获取
 * @returns {{expression: string, description: string, default: boolean, createAt: string}}
 */
exports.get = function () {
    try {
        return fse.readJSONSync(constant.SCHEDULE_FILEPATH);
    } catch (err) {
        return {
            expression: constant.CRON_SCHEDULE_EXPRESSION,
            description: constant.CRON_SCHEDULE_DESCRIPTION,
            default: true
        };
    }
};

/**
 * 设置
 * @param conf
 */
exports.set = function (conf) {
    var json = JSON.stringify(conf, null, 4) + '\n';

    fse.outputFileSync(constant.SCHEDULE_FILEPATH, json);
};

/**
 * 删除
 */
exports.remove = function () {
    fse.removeSync(constant.SCHEDULE_FILEPATH);
};

