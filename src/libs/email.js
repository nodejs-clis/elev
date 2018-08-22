/**
 * 邮件发送
 * @author ydr.me
 * @create 2018-08-19 14:56
 * @update 2018-08-19 14:56
 */


'use strict';

var path = require('blear.node.path');
var string = require('blear.utils.string');
var object = require('blear.utils.object');
var array = require('blear.utils.array');
var date = require('blear.utils.date');
var nodemailer = require('nodemailer');
var fs = require('fs-extra');

var domainConfigs = require('../utils/domain-configs');
var erroTemplate = fs.readFileSync(path.join(__dirname, '../settings/email-error.html'), 'utf8');
var successTemplate = fs.readFileSync(path.join(__dirname, '../settings/email-success.html'), 'utf8');
var constant = require('../settings/constant');

/**
 * 邮件发送
 * @param domain
 * @param err
 * @param history
 * @param callback
 */
module.exports = function (domain, err, history, callback) {
    try {
        var configs = domainConfigs.get(domain);
    } catch (err) {
        return;
    }

    // 没有配置发信服务器
    if (!configs.smtp || !configs.smtp.host) {
        return;
    }

    var smtp = configs.smtp;
    var transport = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure,
        auth: {
            user: smtp.user,
            pass: smtp.pass
        }
    });
    transport.sendMail({
        from: smtp.from,
        to: smtp.to,
        subject: smtp.subject,
        html: err ? string.assign(erroTemplate, {
            subject: smtp.subject,
            message: beautifyError(domain, err, history)
        }) : string.assign(successTemplate, {
            subject: smtp.subject,
            message: beautifySuccess(domain, history)
        })
    }, function (err) {
        if (callback) {
            callback.apply(this, arguments);
        }
    });
};


/**
 * 美化错误信息
 * @param domain
 * @param err
 * @param history
 * @returns {string}
 */
function beautifyError(domain, err, history) {
    var codeList = [
        '状态: 失败'
    ];

    if (history) {
        codeList.push(
            'history start at: ' + history.startTime,
            'history start end: ' + history.endTime,
            'history daemon pid: ' + history.daemonPid,
            'history worker pid: ' + history.workerPid,
            'history log file: ' + history.logFile,
            'history #index: ' + history.index,
            'history domain: ' + domain
        );
    }

    var keys = [
        'name',
        'type',
        'code',
        'message',
        'stack'
    ];

    array.each(keys, function (index, key) {
        var val = err[key];

        if (!val) {
            return;
        }

        codeList.push(
            'Error.' + key + ': ' + val
        );
    });

    object.each(err, function (key, val) {
        codeList.push(
            'Error.' + key + ': ' + val
        );
    });

    return codeList.join('\n');
}


/**
 * 生成成功显示信息
 * @param domain
 * @param history
 * @returns {string}
 */
function beautifySuccess(domain, history) {
    var list = [
        '状态: 成功'
    ];

    if (history) {
        list.push(
            'history start at: ' + history.startTime,
            'history start end: ' + history.endTime,
            'history daemon pid: ' + history.daemonPid,
            'history worker pid: ' + history.workerPid,
            'history log file: ' + history.logFile,
            'history #index: ' + history.index,
            'history domain: ' + domain
        );
    }

    return list.join('\n');
}
