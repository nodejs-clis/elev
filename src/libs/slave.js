/**
 * 奴隶进程（由 worker 进程创建）
 * @author ydr.me
 * @create 2018-08-18 18:30
 * @update 2018-08-18 18:30
 */


'use strict';

var visa = require('./visa');
var constant = require('../settings/constant');

// [
//   node
//   script
//   domain
// ]
var args = process.argv.slice(2);
var domain = args[0];

process.env[constant.SLAVE_ENV] = true;
visa(domain);

