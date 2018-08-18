/**
 * 签证
 * @author ydr.me
 * @create 2018-08-17 17:23
 * @update 2018-08-17 17:23
 */


'use strict';


var visa = require('../libs/visa');

/**
 * 签证
 * @param args
 * @param args.domain
 */
module.exports = function (args) {
    visa(args.domain);
};



