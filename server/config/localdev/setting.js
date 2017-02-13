/**
 * Created by Jay on 14-5-4.
 */
module.exports = {

    env:"localdev",

    host:"localhost",
    port:3000,

    //site domain
    site:"http://localhost:3000/",
    siteName:"ScheduleApp",
    /* mail service config
    mail: {
        stamp: {
            user:"developer@magicfish.cn",
            password:"aabbcc",
            host:"smtp.xxxxx.com",
            port:465,
            ssl:true
        },
        sender:"developer@magicfish.cn",
        senderName:"developer"
    },
    */
    /* SMS service config
    sms:{
    },
    */
    cdn:{
        res:"http://localhost:3000"
    }
};
