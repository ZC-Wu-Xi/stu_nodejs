// 1. 导入 http 模块
const http = require('http');

// 2. 创建服务对象
const server = http.createServer((request, response) => {
    // 获取请求的方法
    console.log(request.method);  // GET
    // 获取请求的 url
    console.log(request.url); // /favicon.ico 只包含 url 中的路径和查询字符串
    // 获取 HTTP 协议的版本号 
    console.log(request.httpVersion); // 1.1
    // 获取 HTTP 请求头
    console.log(request.headers);
    // 获取请求头的指定属性
    console.log(request.headers.host); // 127.0.0.1:9000
    response.end('你好，欸嘿嘿'); // 设置响应体并结束响应
});

// 3. 监听端口，启动服务
server.listen(9000, () => {
    console.log('服务已经启动...');
})