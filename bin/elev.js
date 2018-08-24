#!/usr/bin/env node

/**
 * 命令行
 * @author ydr.me
 * @create 2018-08-16 07:41
 * @update 2018-08-16 07:41
 */

var cli = require('blear.node.cli');

require('../src/cmds/banner');
require('../src/cmds/root');
require('../src/cmds/domain');
require('../src/cmds/visa');
require('../src/cmds/cron');
require('../src/cmds/worker');
require('../src/cmds/email');

cli.parse({
    bin: 'elev',
    package: require('../package.json')
});


