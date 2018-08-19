#!/usr/bin/env node

/**
 * 命令行
 * @author ydr.me
 * @create 2018-08-16 07:41
 * @update 2018-08-16 07:41
 */

var cli = require('/Users/cloudcome/development/github-blearjs/blear.node.cli');

require('../src/cmds/banner');
require('../src/cmds/global');
require('../src/cmds/init');
require('../src/cmds/list');
require('../src/cmds/visa');
require('../src/cmds/cron');
require('../src/cmds/email');
cli.parse({
    bin: 'lev',
    package: require('../package.json')
});


