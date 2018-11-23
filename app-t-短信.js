const SMSClient = require('@alicloud/sms-sdk')
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAId7YySlEoTVHy'
const secretAccessKey = '2djCn5SpKa8b4v30P0NqQjMWxZlnlW '
//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})
//发送短信
smsClient.sendSMS({
    PhoneNumbers: '13001380337',
    SignName: '云通信产品',
    TemplateCode: 'SMS_1000000',
    TemplateParam: '{"name":"wsm","code":"12345"}',"亲爱的${name},您的验证码为${code}",
}).then(function (res) {
    let {Code}=res
    if (Code === 'OK') {
        //处理返回参数
        console.log(res)
    }
}, function (err) {
    console.log(err)
})