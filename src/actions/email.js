/**
 * 邮件 action
 * @author ydr.me
 * @create 2018-08-19 16:53
 * @update 2018-08-19 16:53
 */


'use strict';

var console = require('blear.node.console');

var email = require('../libs/email');
var domainConfigs = require('../utils/domain-configs');

var smtpAlias = {
    'smtp.mxhichina.com': {
        tips: mxhichinaTips,
        name: '阿里云企业邮箱'
    },
    'smtp.163.com': {
        tips: neteaseTips,
        name: '网易163邮箱'
    },
    'smtp.qq.com': {
        tips: qqTips,
        name: '腾讯QQ邮箱'
    }
};

/**
 * 邮件 action
 * @param args
 * @param args.domain
 */
module.exports = function (args) {
    var message = '测试 smtp 邮件发送是否异常';
    var domain = args.domain;
    var err = new Error(message);

    try {
        var configs = domainConfigs.get(domain);
    } catch (err) {
        console.errorWithTime('域名配置获取失败');
        console.errorWithTime(err.message);
        return;
    }

    var alias = smtpAlias[configs.smtp.host];

    console.logWithTime(message);

    if (alias) {
        console.logWithTime('正在使用', alias.name, '发送邮件');
    }

    console.loading();
    email(domain, err, function (err, ret) {
        console.loadingEnd();

        if (err) {
            console.errorWithTime('测试邮件发送失败');
            console.errorWithTime(err.message);

            if (alias) {
                alias.tips();
            }
            return;
        }

        console.infoWithTime('测试邮件发送成功');
        ret.accepted.forEach(function (accepted) {
            console.infoWithTime('收件人', accepted);
        });
    });
};

// ===================
function mxhichinaTips() {
    console.warn('阿里云企业邮箱小提示');
    console.warn('smtp.from 必须填写你的邮箱账号，比如“管理员<' + '' + 'youremailaddress>”');
}

function qqTips() {
    console.warn('腾讯邮箱小提示');
    console.warn('smtp.from 可以填写已绑定域名的邮箱名，比如“管理员<' + '' + 'admin@my-domain.com>”');
    console.warn('smtp.from 如果没有绑定域名必须写 qq.com，比如“管理员<' + '123' + '@qq.com>”');
}

function neteaseTips() {
    console.warn('网易邮箱小提示');
    console.warn('smtp.from 必须填写你的邮箱账号，比如 “管理员<' + '' + 'admin@163.com>”');
}
