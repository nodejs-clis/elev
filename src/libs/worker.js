/**
 * worker 进程（由 master 进程创建）
 * @author ydr.me
 * @create 2018-08-18 13:53
 * @update 2018-08-18 13:53
 */


'use strict';

var spawn = require('child_process').spawn;
var fs = require('fs');

setInterval(function () {

    spawn(
        process.execPath,
        [],
        {

        }
    );


}, 1000);

process.on('SIGINT', function () {
    process.exit(1);
});

