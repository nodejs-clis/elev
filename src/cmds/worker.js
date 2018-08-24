/**
 * worker
 * @author ydr.me
 * @create 2018年08月22日09:11:47
 * @update 2018年08月22日09:11:47
 */


'use strict';

var cli = require('blear.node.cli');

cli
    .command('worker', '定时任务工作')
    .usage('elev worker <ID>', '查看指定 ID 的工作记录')
    // .usage('elev worker <dommain>', '查看指定域名的工作记录')

    .helper()
    .action(require('../actions/worker'));

