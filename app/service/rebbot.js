'use strict'
var qiniu = require('qiniu')
var config = require('../../config/config')

qiniu.conf.ACCESS_KEY = config.qiniu.AK
qiniu.conf.SECRET_KEY = config.qiniu.SK

// 上传空间名
var bucket = 'reddot'

// 上传后 要保存的文件名
var key = ''

// 上传后 返回一个 token 值 传给客户端
function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy({scope: bucket+":"+key});
    // putPolicy.callbackUrl = 'http://your.domain.com/callback';
    // putPolicy.callbackBody = 'filename=$(fname)&filesize=$(fsize)';
    return putPolicy.uploadToken();
}

exports.getQiniuToken = function (key) {
    var token = uptoken(bucket, key)
    // console.log(133)
    return token
}
