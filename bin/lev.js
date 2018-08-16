#!/usr/bin/env node

/**
 * 命令行
 * @author ydr.me
 * @create 2018-08-16 07:41
 * @update 2018-08-16 07:41
 */

var yargs = require('yargs');

yargs
    .detectLocale(false)
    .command(require('../cmds/get'))
    .command(require('../cmds/send'))
    .demandCommand(1, 'You need at least one command before moving on')
    .parse();
