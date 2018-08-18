#!/usr/bin/env node

/**
 * 命令行
 * @author ydr.me
 * @create 2018-08-16 07:41
 * @update 2018-08-16 07:41
 */

var cli = require('blear.node.cli');

cli
    .banner(
        'elev'
    )
    .command()
    .versioning()
    .helper()
    .command(require('../src/cmds/init'))
    .command(require('../src/cmds/visa'))
    .command(require('../src/cmds/cron'))
    .parse({
        bin: 'lev',
        package: require('../package.json')
    });


