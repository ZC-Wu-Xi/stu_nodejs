/**
 * 创建一个HTTP服务，端口为9000，满足如下需求
 * GET  /index.html      响应  page/index.html 的文件内容
 * GET  /css/app.css     响应  page/css/app.css 的文件内容
 * GET  /images/logo.png 响应  page/images/1ogo.png 的文件内容
 */

// 导入 http 模块
const http = require('http');
const fs = require('fs');
const path = require('path');

// 声明一个变量
let mimes = {  
    html: 'text/html',  
    css: 'text/css',  
    js: 'application/javascript',  
    json: 'application/json',  
    xml: 'application/xml',  
    png: 'image/png',  
    jpg: 'image/jpeg',  
    gif: 'image/gif',  
    pdf: 'application/pdf',  
    zip: 'application/zip'  
};  

// 创建服务对象
const server = http.createServer((request, response) => {
    if (request.method !== "GET") {
        response.statusCode = 405;
        response.end('<h1>405 Method Not Allowed</h1>')
        return;
    }
    // 获取请求URL的路径
    
    let {pathname} = new URL(request.url, 'http://192.168.0.1');

    // 优化
    let root = __dirname + '/page' // 网站根目录
    // 拼接文件路径
    let filePath = root + pathname;
    // 读取文件
    // 读取文件内容 fs 这里异步方式
    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.setHeader('content-type','text/html;charset=utf-8'); // 防止中文乱码
            switch (err.code) {
                case "ENOENT" : // 找不到
                    response.statusCode = 404;
                    response.end('<h1>404 Not Found</h1>')
                case "EPERM" : // 权限不足
                    response.statusCode = 403;
                    response.end('<h1>403 Forbidden</h1>')
                default :
                    response.statusCode = 500;
                    response.end("<h1>Internal Server Error</h1>");
            }
            return;
        }
        // 获取文件的后缀名
        let ext = path.extname(filePath).slice(1); // 截掉.只保留后缀
        // 获取对应的类型
        let type = mimes[ext];
        if (type) {
            // 匹配到了
            // response.setHeader('content-type', type);
            if (ext === 'html') {
                response.setHeader('content-type', type + ";charset=utf-8"); // // 防止中文乱码 响应头中的字符集优先级高于html中meta标签设置的字符集
            } else {
                response.setHeader('content-type', type);
            }
        } else {
            // 没有匹配到
            // 对于未知的资源类型，可以选择 `application/octet-stream `类型，浏览器在遇到该类型的响应时，会对响应体内容进行独立存储，也就是我们常见的 **下载** 效果  
            response.setHeader('content-type', 'application/octet-stream')
        }
        
        // 响应文件内容
        response.end(data)
    })


    // if (pathname === '/index.html') {
    //     // 读取文件内容
    //     let html = fs.readFileSync(__dirname + '/page/index.html') // 返回值是一个buffer
    //     // 设置响应体
    //     response.end(html) // 设置响应体 end的响应体可以是字符串也可以是一个buffer
        
    // } else  if (pathname === '/css/app.css') {
    //       // 读取文件内容s
    //       let css = fs.readFileSync(__dirname + '/page/css/app.css') // 返回值是一个buffer
    //       // 设置响应体
    //       response.end(css) // 设置响应体 end的响应体可以是字符串也可以是一个buffer
    // } else if (pathname === '/images/logo.png') {
    //     // 读取文件内容
    //     let img = fs.readFileSync(__dirname + '/page/images/logo.png') // 返回值是一个buffer
    //     // 设置响应体
    //     response.end(img) // 设置响应体 end的响应体可以是字符串也可以是一个buffer
    // } else {
    //     response.statusCode = 404;
    //     response.end('<h1>404 Not Found</h1>')
    // }
})

server.listen(9000, () => {
    console.log('服务已经启动');
})
