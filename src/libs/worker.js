/**
 * worker
 * @author ydr.me
 * @create 2018-08-18 13:53
 * @update 2018-08-18 13:53
 */


'use strict';

setInterval(function () {
    console.log(Date.now(), Math.random())
}, 1000);

process.on('SIGINT', function () {
    console.log('监听到 SIGINT 信号，进程退出');
    process.exit(1);
});

