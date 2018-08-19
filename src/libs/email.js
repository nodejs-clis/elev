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
var template = fs.readFileSync(path.join(__dirname, '../settings/email.html'), 'utf8');
var constant = require('../settings/constant');

/**
 * 邮件发送
 * @param domain
 * @param err
 * @param callback
 */
module.exports = function (domain, err, callback) {
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
        html: string.assign(template, {
            subject: smtp.subject,
            error: beautifyError(err)
        })
    }, function (err) {
        if (callback) {
            callback.apply(this, arguments);
        }
    });
};


/**
 * 美化错误信息
 * @param err
 * @returns {string}
 */
function beautifyError(err) {
    var codeList = [
        'Error at: ' + date.format(constant.DATE_FORMAT)
    ];
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

