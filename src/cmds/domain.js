/**
 * init 命令
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
        'elev domain <domain> -r [reference]',
        '参考已有域名新建配置文件，\n' +
        '需要覆盖已有的配置文件，需要传 -f 参数'
    )
    // .option('domain', {
    //     alias: ['d'],
    //     describe: '域名，仅支持单域名的泛域名证书',
    //     type: 'string',
    //     required: true
    // })
    .option('reference', {
        alias: ['r'],
        describe: '参考已配置好的域名配置文件',
        type: 'string',
        required: false
    })
    .option('force', {
        alias: 'f',
        describe: '强制覆盖已存在的配置文件',
        type: 'boolean'
    })
    .helper()
    .action(require('../actions/domain'));
