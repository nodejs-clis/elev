/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-18 15:55
 * @update 2018-08-18 15:55
 */


'use strict';

var cli = require('/Users/cloudcome/development/github-blearjs/blear.node.cli');
var fs = require('fs');
var path = require('blear.node.path');

// @link http://patorjk.com/software/taag/#p=display&f=Slant%20Relief&t=ELEV
var file = path.join(__dirname, '../settings/banner-3.txt');
var banner = fs.readFileSync(file, 'utf8');

cli
    .banner(
        banner
    );



