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
    .helper()
    .usage('elev worker <ind' + 'ex' + '>', '查看指定索引的工作记录')
    .usage('elev worker <dom' + 'ain' + '>', '查看指定域名的工作记录')

    .action(require('../actions/worker'));

