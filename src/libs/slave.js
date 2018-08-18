/**
 * 奴隶进程（由 worker 进程创建）
 * @author ydr.me
 * @create 2018-08-18 18:30
 * @update 2018-08-18 18:30
 */


'use strict';

var console = require('blear.node.console');
var path = require('blear.node.path');

var constant = require('../settings/constant');
var visa = require('../actions/visa');

// [
//   node
//   script
//   index
//   domain
// ]
var args = process.argv.slice(2);
var index = args[0];
var domain = args[1];
var configFile = path.join(constant.DOMAINS_DIRNAME, domain + '.json');

console.log();
console.log();
console.infoWithTime('证书签发开始');
console.logWithTime('开始签发第', index, '张证书');
console.logWithTime('签发域名', domain);
console.logWithTime('配置文件', configFile);

console.logWithTime('模拟签发证书开始');
var times = 10000000;

while (times > 0) {
    times--;
}
console.logWithTime('模拟签发证书完毕');

// visa({
//     config: ''
// });

