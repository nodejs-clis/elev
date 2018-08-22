/**
 * 列出
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var cli = require('blear.node.cli');

cli
    .command('list', '列出当前已配置的域名')
    .helper()
    .action(require('../actions/list'));
