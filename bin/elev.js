#!/usr/bin/env node

/**
 * 命令行
 * @author ydr.me
 * @create 2018-08-16 07:41
 * @update 2018-08-16 07:41
 */

var cli = require('blear.node.cli');

require('../src/cmds/banner');
require('../src/cmds/global');
require('../src/cmds/init');
require('../src/cmds/visa');
require('../src/cmds/cron');
cli.parse({
    bin: 'lev',
    package: require('../package.json')
});


