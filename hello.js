console.log("startAll",new Date().getTime());
/*console.log("start",new Date().getTime());*/
var page = require('webpage').create(),
    system = require('system');
/*console.log("end",new Date().getTime());*/

/*console.log("startLoad",new Date().getTime());*/
/*var address = 'http://baidu.com';//填写需要打印的文件位置*/
var address = system.args[1];
/*var output = './img/'+'xigua2'+'.png';//存储文件路径和名称*/
var output = system.args[2];

if (system.args.length > 3 && system.args[3].substr(-2) === "px") {
    var size = system.args[3].split('*');
    if (size.length === 2) {
        var pageWidth = parseInt(size[0], 10);
        var pageHeight = parseInt(size[1], 10);
        page.viewportSize = {width: pageWidth, height: pageHeight};
        // 通过clipRect可以指定渲染的区域：
        /*page.clipRect = {top: 0, left: 0, width: pageWidth, height: pageHeight};*/
    }
}else{
    page.viewportSize = { width: 1380, height: 800 };//设置长宽 ...网页打开的窗口宽高
}

page.open(address, function (status) {
    /*var bb = page.evaluate(function () {
       /!* return document.querySelector('#lg').getBoundingClientRect();*!/
       /!*window.document.body.scrollTop = document.body.scrollHeight;*!/
       var i=0;
       var timer=setInterval(function(){
           i+=500;
           window.scrollTo(0,i);
           if(i >= document.body.scrollHeight){
               clearInterval(timer);
           }
       },500);
        /!*window.scrollTo(0,document.body.scrollHeight);//滚动到底部*!/
       /!*setTimeout(function(){
           return document.getElementsByTagName('html')[0].getBoundingClientRect();
       },1000);*!/
        /!*return document.getElementsByTagName('html')[0].getBoundingClientRect();*!/
    });*/
    // 按照实际页面的高度，设定渲染的宽高
   /* console.log(bb.top,bb.left,bb.height);*/
    /*page.clipRect = {
        top:    bb.top,
        left:   bb.left,
        width:  bb.width,
        height: bb.height
    };*/
    if (status !== 'success') {
        console.log('Unable to load the address!');
        phantom.exit();
    } else {
        /*console.log("endLoad",new Date().getTime());*/
        /*console.log("startBuild",new Date().getTime());*/
        page.render(output);
        /*console.log("endBuild",new Date().getTime());*/
        console.log("endAll",new Date().getTime());
        phantom.exit();

        /*window.setTimeout(function () {
            page.render(output);
            phantom.exit();
        }, 10000);*/
    }
});

//phantomjs D:\studyWProject\qxStudy\phantomjsStudy\hello.js https://www.taobao.com ./img/2.png

//phantomjs D:\studyWProject\qxStudy\phantomjsStudy\hello.js https://www.taobao.com ./img/qx19.png 500px*500px
//phantomjs D:\studyWProject\qxStudy\phantomjsStudy\hello.js http://www.taobao.com ./img/qx19.png