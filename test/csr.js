/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-23 17:35
 * @update 2018-08-23 17:35
 */


'use strict';

var csr = require('../src/libs/csr');
var domainConfigs = require('../src/utils/domain-configs');


var list = csr(domainConfigs.get('beidoucheche.com'));

console.log(list[0].toString());

console.log(list[1].toString());

