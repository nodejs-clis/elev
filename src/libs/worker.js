/**
 * worker 进程（由 master 进程创建）
 * @author ydr.me
 * @create 2018-08-18 13:53
 * @update 2018-08-18 13:53
 */


'use strict';

var spawn = require('child_process').spawn;
var fse = require('fs-extra');
var date = require('blear.utils.date');
var path = require('blear.node.path');

var constant = require('../settings/constant');

setInterval(function () {
    var filename = date.format('YYYYMMDD');
    var filepath = path.join(constant.LOGS_DIRNAME, filename + '.log');

    try {
        fse.ensureFileSync(filepath);
    } catch (err) {
        // ignore
    }

    spawn(
        process.execPath,
        [
            require.resolve('./slave.js'),
            'a',
            'b',
            'c'
        ],
        {
            stdio: [
                // stdio
                'ignore',
                // stdout
                fse.openSync(filepath, 'a'),
                // stderr
                fse.openSync(filepath, 'a')
            ],
            env: process.env,
            cwd: process.cwd()
        }
    );
}, 1000);

process.on('SIGINT', function () {
    process.exit(1);
});

