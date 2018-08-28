/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-28 14:27
 * @update 2018-08-28 14:27
 */


'use strict';

var cli = require('blear.node.cli');

cli
    .command('version', '输出版本号并检查更新')
    .action(cli.version);


