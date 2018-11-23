var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    phoneNumber: {
        unique: true,
        type: String
    },
    // 区号
    areaCode: String,
    // 验证码
    verifyCode: String,
    verified: {
        type: Boolean,
        default: false
    },
    accessToken: String,
    nickname: String,
    gender: String,
    breed: String,
    age: String,
    avatar: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

// 数据储存前的前置逻辑
UserSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    next()
})

module.exports = mongoose.model('User', UserSchema)