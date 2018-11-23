const koa=require("koa")
const Router=require('koa-router')
const koaBody = require('koa-body')

const router=new Router()
const app=new koa()

//koa-body
app.use(koaBody())


// Post
router.post('/login',async (ctx,next)=>{
    console.log('login Success!')
    //ctx.request.body 用于获取post的参数
    ctx.body=ctx.request.body;
})


// GET
router.get('/user',async (ctx,next)=>{
    console.log('user Ok!')
    //crx.query 是用于获取get请求的参数
    ctx.body=ctx.query;
})


//koa-router
app.use(router.routes()).use(router.allowedMethods());

app.listen(3001, () => {
    console.log('running at 3001')
})