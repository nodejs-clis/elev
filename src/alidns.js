/**
 * ali dns
 * @author ydr.me
 * @create 2018-08-14 10:37
 * @update 2018-08-14 10:37
 */


'use strict';

var object = require('blear.utils.object');
var qs = require('blear.utils.querystring');
var random = require('blear.utils.random');
var typeis = require('blear.utils.typeis');
var request = require('blear.node.request');
var console = require('blear.node.console');
var Error = require('blear.classes.error');
var crypto = require('crypto');

// https://help.aliyun.com/document_detail/29744.html
var ALIDNS_URL = 'https://alidns.aliyuncs.com';

// https://help.aliyun.com/document_detail/29745.html
var publicArgsDemo = {
    Format: 'JSON',
    Version: '2015-01-09',
    AccessKeyId: function (accessKeyId) {
        return accessKeyId;
    },
    // Signature: '',
    SignatureMethod: 'HMAC-SHA1',
    // 请求的时间戳。日期格式按照ISO8601标准表示，并需要使用UTC时间。
    // 格式为YYYY-MM-DDThh:mm:ssZ 例如，2015-01-09T12:00:00Z（为UTC时间2015年1月9日12点0分0秒）
    Timestamp: function () {
        return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')
    },
    SignatureVersion: '1.0',
    SignatureNonce: function () {
        return random.string();
    }
};


/**
 * 签名
 * @param method
 * @param args
 * @param accessKeySecret
 * @returns {string}
 */
function sign(method, args, accessKeySecret) {
    method = method.toUpperCase();
    var canonicalizedQueryString = qs.stringify(sortKeys(args));
    var strToSign = method + '&' + encodeURIComponent('/') + '&' + encodeURIComponent(canonicalizedQueryString);
    var signature = crypto.createHmac('sha1', accessKeySecret + '&');
    return signature.update(strToSign, 'utf8').digest('base64');
}

/**
 * 键排序
 * @param obj1
 */
function sortKeys(obj1) {
    var keys = Object.keys(obj1);
    var obj2 = {};
    keys.sort();
    keys.forEach(function (key) {
        obj2[key] = obj1[key];
    });
    return obj2;
}

/**
 * 询问阿里云
 * @param options
 * @param callback
 */
function ask(options, callback) {
    options.url = ALIDNS_URL;
    request(options, function (err, body, res) {
        var json = {};

        try {
            json = JSON.parse(body);
        } catch (err) {
            return callback(new Error('响应解析失败：' + err.message));
        }

        if (json.Code && json.Message) {
            return callback(new Error(json.Code, json.Message));
        }

        callback(null, json);
    });
}

function buildPublicArgs(accessKeyId, accessKeySecret) {
    var publicArgs = {};
    object.each(publicArgsDemo, function (key, val) {
        if (typeis.Function(val)) {
            val = val(accessKeyId, accessKeySecret);
        }

        publicArgs[key] = val;
    });
    return publicArgs;
}

/**
 * 设置记录
 * @link https://help.aliyun.com/document_detail/29772.html
 * @param configs
 * @param configs.dnsServerAccessKey
 * @param configs.dnsServerAccessSecret
 * @param configs.domain
 * @param configs.debug
 * @param value
 * @param callback
 */
function addRecord(configs, value, callback) {
    var accessKeyId = configs.dnsServerAccessKey;
    var accessKeySecret = configs.dnsServerAccessSecret;
    var domain = configs.domain;
    var method = 'get';
    var privateArgs = {
        Action: 'AddDomainRecord',
        DomainName: domain,
        RR: '_acme-challenge',
        Type: 'TXT',
        Value: value
    };
    var publicArgs = buildPublicArgs(accessKeyId, accessKeySecret);
    var args = object.assign(publicArgs, privateArgs);

    args.Signature = sign(method, args, accessKeySecret);
    console.logWithTime('添加 TXT 记录', privateArgs.Value);
    ask({
        method: method,
        query: args,
        debug: configs.debug
    }, function (err, json) {
        // 重复设置也默认正确
        if (err && err.Code === 'DomainRecordDuplicate') {
            return callback();
        }

        callback(err, json && json.RecordId);
    });
}

/**
 * 删除记录
 * @param configs
 * @param configs.dnsServerAccessKey
 * @param configs.dnsServerAccessSecret
 * @param configs.debug
 * @param recordId
 * @param callback
 */
function removeRecord(configs, recordId, callback) {
    var accessKeyId = configs.dnsServerAccessKey;
    var accessKeySecret = configs.dnsServerAccessSecret;
    var method = 'get';
    var privateArgs = {
        Action: 'DeleteDomainRecord',
        RecordId: recordId
    };
    var publicArgs = buildPublicArgs(accessKeyId, accessKeySecret);
    var args = object.assign(publicArgs, privateArgs);

    args.Signature = sign(method, args, accessKeySecret);
    console.logWithTime('删除 TXT 记录');
    ask({
        method: method,
        query: args,
        debug: configs.debug
    }, callback);
}


exports.addRecord = addRecord;
exports.removeRecord = removeRecord;

