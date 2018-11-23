
var Router = require('koa-router')
var User = require('../app/controllers/user')
var App = require('../app/controllers/app')

module.exports = function () {





    var router = new Router({
        prefix: '/api/1'
    })

    // 注意请求头和请求体约定的参数类型
    // router.post('/login',async (ctx,next)=>{
    //     console.log('login Success!')
    //     //ctx.request.body 用于获取post的参数
    //     ctx.body=ctx.request.body;
    // })

    // router.get('/user',async (ctx,next)=>{
    //     console.log('user Ok!')
    //     //crx.query 是用于获取get请求的参数
    //     ctx.body=ctx.query;
    // })

    // App.hasBody App.hasToken 均为过滤信息的中间件
    // user
    router.post('/u/signup', User.signup)
    router.post('/u/verify', User.verify)
    router.post('/u/update', User.update)

    // app
    router.post('/u/signature', App.signature)

    return router
}
