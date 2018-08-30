/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-29 18:39
 * @update 2018-08-29 18:39
 */


'use strict';

var Class = require('blear.classes.class');
var path = require('blear.node.path');
var string = require('blear.utils.string');
var ini = require('ini');
var fs = require('fs');
var fse = require('fs-extra');

var Conf = Class.extend({
    constructor: function (templateFile) {
        this.template = fs.readFileSync(
            path.join(__dirname, '../settings', templateFile),
            'utf8'
        );
    },

    /**
     * 生成配置文件（带注释）
     * @param file
     * @param data
     * @returns {String}
     */
    generate: function (file, data) {
        fse.outputFileSync(
            file,
            string.assign(this.template, data),
            'utf8'
        );
    },

    /**
     * 解析配置文件
     * @param file
     * @returns {*}
     */
    parse: function (file) {
        return ini.parse(
            fs.readFileSync(
                file,
                'utf8'
            )
        );
    },

    remove: function (file) {
        fse.removeSync(file);
    }
});

module.exports = Conf;