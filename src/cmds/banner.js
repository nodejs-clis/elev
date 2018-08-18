/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-18 15:55
 * @update 2018-08-18 15:55
 */


'use strict';

var cli = require('/Users/cloudcome/development/github-blearjs/blear.node.cli');
var console = require('blear.node.console');

// @link http://patorjk.com/software/taag/#p=display&f=Slant%20Relief&t=ELEV
var pl = function () {
    return '  ';
};

var e1 = function (txt) {
    return console.pretty(txt, [
        'red',
        'bold'
    ]);
};
var l2 = function (txt) {
    return console.pretty(txt, [
        'magenta',
        'bold'
    ]);
};
var e3 = function (txt) {
    return console.pretty(txt, [
        'yellow',
        'bold'
    ]);
};
var v4 = function (txt) {
    return console.pretty(txt, [
        'green',
        'bold'
    ]);
};

cli
    .banner(
        [
            '',
            [
                pl(),
                e1('`7MM"""YMM'),
                l2('  `7MMF\''),
                e3('      `7MM"""YMM'),
                v4('  `7MMF\'   `7MF\'')
            ].join(''),
            [
                pl(),
                e1('  MM    `7'),
                l2('    MM'),
                e3('          MM    `7'),
                v4('    `MA     ,V')
            ].join(''),
            [
                pl(),
                e1('  MM   d'),
                l2('      MM'),
                e3('          MM   d'),
                v4('       VM:   ,V')
            ].join(''),
            [
                pl(),
                e1('  MMmmMM'),
                l2('      MM'),
                e3('          MMmmMM'),
                v4('        MM.  M\'')
            ].join(''),
            [
                pl(),
                e1('  MM   Y  ,'),
                l2('   MM      ,'),
                e3('   MM   Y  ,'),
                v4('     `MM A\'')
            ].join(''),
            [
                pl(),
                e1('  MM     ,M'),
                l2('   MM     ,M'),
                e3('   MM     ,M'),
                v4('      :MM;')
            ].join(''),
            [
                pl(),
                e1('.JMMmmmmMMM'),
                l2(' .JMMmmmmMMM'),
                e3(' .JMMmmmmMMM'),
                v4('       VF')
            ].join(''),
            ''
        ].join('\n')
    );



