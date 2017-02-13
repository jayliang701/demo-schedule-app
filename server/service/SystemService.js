exports.config = {
    name: "system",
    enabled: true,
    security: {
        //@performance 获得服务器CPU和内存监控数据
        "performance":{ needLogin:false }
    }
};

exports.performance = function(req, res, params) {
    var Performance = global.Performance || { cpu:[], mem:[] };
    var result = {};
    //只需要显示最新的30次监控数据
    for (var key in Performance) {
        result[key] = Performance[key].slice(-30);
    }
    res.sayOK(result);
}


