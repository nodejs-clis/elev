/**
 * domain 命令
 * @author ydr.me
 * @create 2018-08-16 08:32
 * @update 2018-08-16 08:32
 */


'use strict';

var cli = require('blear.node.cli');

cli
    .command('domain', '域名配置文件')
    .usage(
        'elev domain',
        '列出当前已配置的域名'
    )
    .usage(
        'elev domain <domain>',
        '新建或编辑域名配置文件'
    )
    .usage(
        'elev domain <domain> -r <reference>',
        '参考指定域名进行新建或编辑配置文件'
    )
    .option('reference', {
        alias: ['r'],
        description: '指定参考域名',
        type: 'string',
        required: false,
        transform: function (val) {
            return val.toLowerCase();
        }
    })
    .option('force', {
        alias: 'f',
        description: '强制覆盖',
        type: 'boolean'
    })
    .option('delete', {
        alias: 'D',
        description: '删除指定域名'
    })
    .helper()
    .action(require('../actions/domain'));
