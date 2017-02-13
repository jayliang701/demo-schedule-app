var cpuStat = require('cpu-stat');
var os = require('os');

exports.exec = function(callBack, option) {

    var max = option.max || 30;
    var duration = (option.duration || 10) * 1000;
    var checkTime = (option.checkTime || 1) * 1000;

    var Performance = global.Performance;
    //var PerformanceSave = global.PerformanceSave;
    if (!Performance) {
        //初始化监控数据
        Performance = { cpu:[], mem:[] };
        global.Performance = Performance;

        //PerformanceSave = { cpu:[], mem:[] };
        //global.PerformanceSave = PerformanceSave;

        var now = Date.now();
        for (var i = 0; i < 30; i++) {
            var time = now - i * duration;
            Performance.cpu.push([ time, 0 ]);
            Performance.mem.push([ time, 0 ]);
        }
    }

    cpuStat.usagePercent({ sampleMs:checkTime }, function(err, cpuPercent) {
        if (err) {
            console.error(err);
            cpuPercent = 0;
        }
        var Performance = global.Performance;
        var time = Date.now();

        //最多记录max次监控数据, 把旧数据移除
        if (Performance.cpu.length >= max) Performance.cpu.shift();
        //if (Performance.mem.length >= max) Performance.mem.shift();

        Performance.cpu.push([ time, cpuPercent ]);
        //PerformanceSave.cpu.push([ time, cpuPercent ]);
        console.log('cpu: ', cpuPercent, '%');

        var totalMem = os.totalmem();
        var usedMem = totalMem - os.freemem();
        var memPercent = 100 * usedMem / totalMem;

        Performance.mem.push([ time, memPercent ]);
        //PerformanceSave.mem.push([ time, memPercent ]);
        console.log('mem: ', memPercent, '%');

        callBack();
    });
}