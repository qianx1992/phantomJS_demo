var page = require('webpage').create(),
    system = require('system'),
    address, output, size;

if (system.args.length < 3 || system.args.length > 5) {
    console.log('Usage: rasterize.js URL filename');
    phantom.exit(1);
} else {
    address = system.args[1];
    output = system.args[2];
    page.viewportSize = { width: 1024, height: 600 };
    page.open(address, function (status) {
        // 通过在页面上执行脚本获取页面的渲染高度
        var bb = page.evaluate(function () {
            return document.getElementsByTagName('html')[0].getBoundingClientRect();
        });
        // 按照实际页面的高度，设定渲染的宽高
        page.clipRect = {
            top:    bb.top,
            left:   bb.left,
            width:  bb.width,
            height: bb.height
        };
        // 预留一定的渲染时间
        window.setTimeout(function () {
            page.render(output);
            page.close();
            console.log('render ok');
        }, 1000);
    });
}

//通过执行D:\Software\phantomjs-1.9.7-windows>phantomjs.exe render.js http://cnblogs.com cnblogs.png就可以把博客园首页截取下来了。