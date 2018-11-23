
var mongoose = require('mongoose')
var xss = require('xss')
var User = mongoose.model('User')
var uuid = require('uuid')
var sms = require('./../service/sms')


// 和user相关的组件
exports.signup = async (ctx, next) => {

    // console.log(ctx)
    var phoneNumber = ctx.request.body.phoneNumber
    // console.log(phoneNumber)

    var user = await User.findOne({
        phoneNumber: phoneNumber
    }).exec()
    // console.log(user)

    // 生成 token 每个用户的唯一凭证
    var verifyCode = sms.getCode()

    if (!user) {
        var accessToken = uuid.v4()

        user = new User({
            nickname: '内测人员', // 所以没有跟新过昵称的默认姓名
            phoneNumber: xss(phoneNumber),
            verifyCode: verifyCode,
            accessToken: accessToken,
            avatar: 'http://pi4ncjzee.bkt.clouddn.com/Arranca,%20Sancho....jpg'
        })
    } else {
        user.verifyCode = verifyCode
    }


    try {
        // console.log('try')
        user = await user.save()
    }
    catch (e) {
        ctx.body = {
            success: false
        }
        return next
    }

    try {
        // 编辑短信内容
        var msg = '您的注册验证码是:' + user.verifyCode
        sms.send(user.phoneNumber, msg)
    }
    catch (e) {
        console.log(e)
        ctx.body = {
            success: false,
            err: '短信发送异常'
        }
        return next
    }


    ctx.body = {
        success: true
    }

    return next
}


exports.verify = async (ctx, next) => {

    var verifyCode = ctx.request.body.verifyCode
    var phoneNumber = ctx.request.body.phoneNumber

    if (!verifyCode || !phoneNumber) {
        ctx.body = {
            success: false,
            err: '验证未通过'
        }
        return next
    }

    var user = await User.findOne({
        phoneNumber: phoneNumber,
        verifyCode: verifyCode
    }).exec()

    if (user) {
        user.verified = true
        user = await user.save()

        ctx.body = {
            success: true,
            data: {
                nickname: user.nickname,
                accessToken: user.accessToken,
                avatar: user.avatar,
                _id: user._id
            }
        }
    } else {
        ctx.body = {
            success: false,
            err: '验证未通过'
        }
        return next
    }

    return next
}

exports.update = async(ctx, next) => {

    var body = ctx.request.body
    var accessToken = body.accessToken
    // console.log(body)

    var user = await User.findOne({
        accessToken: accessToken
    }).exec()

    if (!user) {
        ctx.body = {
            success: false,
            err: '未查询到当前用户'
        }
        return next
    }

    // 列出用户需要更新的字段 (不要用空格隔开)
    var fields = 'avatar,gender,age,nickname,breed'.split(',')
    // 对字段进行更新
    fields.forEach((field) => {
        if (body[field]) {
            user[field] = body[field]
        }
    })
    user = await user.save()

    ctx.body = {
        success: true,
        data: {
            nickname: user.nickname,
            accessToken: user.accessToken,
            avatar: user.avatar,
            age: user.age,
            breed: user.breed,
            gender: user.gender,
            _id: user._id
        }
    }

    return next
}
