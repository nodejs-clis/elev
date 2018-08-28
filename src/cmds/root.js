/**
 * root command
 * @author ydr.me
 * @create 2018-08-18 15:55
 * @update 2018-08-18 15:55
 */


'use strict';

var cli = require('blear.node.cli');

cli
    .command()
    .versioning()
    .helper()
    .action(cli.help);



