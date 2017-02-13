/**
 * Created by Jay on 14-4-30.
 */
var App = require("weroll/App");
var app = new App();

var Setting = global.SETTING;

app.addTask(function(cb) {
    //启动web服务器
    require("weroll/web/WebApp").start(Setting, function(webApp) {
        cb();
    });
});
app.addTask(function(cb) {
    //初始化邮件服务
    var config = {
        smtp:{
            user:"developer@magicfish.cn",
            password:"xxxxxxxxx",
            host:"smtp.xxxx.com",
            port:465,
            ssl:true
        },
        sender:"developer@magicfish.cn",
        senderName:"Robot",
        simulate:true
    };
    require("weroll/utils/MailUtil").init(config);

    //启动计划任务管理器
    require("weroll/schedule/ScheduleManager").start();
    cb();
});

app.run();