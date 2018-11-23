
var fs = require('fs')
var path = require('path')
var mongoose = require('mongoose')
var db = 'mongodb://localhost/imooc-app'

mongoose.Promise = require('bluebird')
mongoose.connect(db,{ useNewUrlParser: true })

require('./app/models/user')

// var models_path = path.join(__dirname, '/app/models')

// var walk = (modelPath) => {
//     fs
//         .readFileSync(modelPath)
//         .forEach((file) => {
//             var filePath = path.join(modelPath, '/' + file)
//             var stat = fs.statSync(filePath)
//
//             if (stat.isFile()) {
//                if (/(.*)\.(js|coffee)/.test(file)) {
//                    require(filePath)
//                }
//             } else if(stat.isDirectory()) {
//                 // 说明是文件夹
//                 walk(filePath)
//             }
//         })
// }

var koa = require('koa')
var logger = require('koa-logger')
var session = require('koa-session')
var bodyParser = require('koa-body')

var app = new koa()

// 加密用的key
app.keys = ['Geronimo']
app.use(logger())
app.use(session(app))
app.use(bodyParser())

var router = require('./config/routes')()

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000, () => {
    console.log('running at 3000')
})
