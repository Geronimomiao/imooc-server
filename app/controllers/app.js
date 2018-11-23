var mongoose = require('mongoose')
var User = mongoose.model('User')
var rebbot = require('../service/rebbot')

// 和 app 相关组件
exports.signature = async (ctx, next) => {
    var body = ctx.request.body
    var key = body.key
    var token
    // console.log(key)
    if (key) {
        token = rebbot.getQiniuToken(key)

    }
    ctx.body = {
        success: true,
        token: token
    }

}

// 检查 body 是否为空
// exports.hasBody = async (ctx, next) => {
//     var body = ctx.request.body
//     // console.log(body)
//     if (!body) {
//         ctx.body = {
//             success: false,
//             err: '无请求体信息'
//         }
//         return next
//     }
//     await next
// }

// 检查 Token
// exports.hasToken = async (ctx, next) => {
//     // Token 可能在 query 里 或 body 里
//     var accessToken = ctx.query.accessToken
//     if (!accessToken) {
//         accessToken = ctx.request.body.accessToken
//     }
//
//     if (!accessToken) {
//         ctx.body = {
//             success: false,
//             err: '无访问凭证'
//         }
//         return next
//     }
//
//     var user = await User.findOne({
//         accessToken: accessToken
//     }).exec()
//
//     if (!user) {
//         ctx.body = {
//             success: false,
//             err: '未查到当前用户'
//         }
//         return next
//     }
//
//     ctx.session = ctx.session || {}
//     ctx.session.user = user
//
//     await next
// }

