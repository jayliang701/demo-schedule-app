var MailUtil = require('weroll/utils/MailUtil');

exports.exec = function(callBack, option) {

    var Performance = global.Performance;
    if (!Performance) return callBack(new Error("invalid Performance data"));

    var result = { cpu:{}, mem:{} }, total = 0;

    var yesterdayEnd = new Date();
    yesterdayEnd.setHours(0);
    yesterdayEnd.setMinutes(0);
    yesterdayEnd.setSeconds(0);
    yesterdayEnd.setMilliseconds(0);
    //yesterdayEnd 即是新的一天的开始, 昨日的结束
    yesterdayEnd = yesterdayEnd.getTime() - 1;
    yesterdayEnd += 24 * 60 * 60 * 1000;

    var cpu = Performance.cpu || [];
    result.cpu.max = cpu[0][1];
    cpu.forEach(function(obj) {
        if (obj[0] > yesterdayEnd) return;
        //获得昨日CPU使用率峰值和出现时间
        result.cpu.max = Math.max(obj[1], result.cpu.max);
        result.cpu.maxTime = obj[0];
        total += obj[1];
    });
    //获得昨日CPU使用率平均值
    result.cpu.avg = total / cpu.length;

    total = 0;
    var mem = Performance.mem || [];
    result.mem.max = mem[0][1];
    mem.forEach(function(obj) {
        if (obj[0] > yesterdayEnd) return;
        //获得昨日内存使用率峰值和出现时间
        result.mem.max = Math.max(obj[1], result.mem.max);
        result.mem.maxTime = obj[0];
        total += obj[1];
    });
    //获得昨日内存使用率平均值
    result.mem.avg = total / mem.length;

    //撰写报告, 发送邮件
    var title = (option.title || "{DATE} 服务器性能监控报告").replace("{DATE}", moment(yesterdayEnd).format("YYYY-MM-DD"));
    //定义文本格式的正文
    var plain = `CPU 平均使用率: ${Number(result.cpu.avg).toFixed(2)}%\r\n`;
    plain += `CPU 峰值: ${Number(result.cpu.max).toFixed(2)}%    出现于: ${moment(result.cpu.maxTime).format("HH:mm:ss")}\r\n\r\n`;
    plain += `内存 平均使用率: ${Number(result.cpu.avg).toFixed(2)}%\r\n`;
    plain += `内存 峰值: ${Number(result.cpu.max).toFixed(2)}%    出现于: ${moment(result.cpu.maxTime).format("HH:mm:ss")}\r\n\r\n`;
    plain += "\r\n\r\n" + (option.senderName || "");

    //定义HTML格式的正文
    var html = plain.replace(/\r\n/g, '<br>');

    var content = { plain:plain, html:html };

    //发送邮件
    MailUtil.send(option.sendTo, title, content, function(err) {
        //结束
        callBack();
    });

}