// 导入 http 模块
const http = require('http');

// 创建服务对象
const server = http.createServer((request, response) => {
    // 1. 设置响应状态码
    response.statusCode = 203;
    // 2. 设置响应状态描述
    response.statusMessage = "i love you";
    // 3. 设置响应头
    response.setHeader('content-type','text/html;charset=utf-8'); // 防止中文乱码
    // response.setHeader('content-type', 'html/text');
    // response.setHeader('Server', 'Node.js');
    response.setHeader('myHeader', 'test test test')
    response.setHeader('test', ['a', 'b', 'c']); // 设置多个同名响应头
    // 4. 设置响应体
    response.write('love'); // 设置响应体 
    response.write('love'); // 设置响应体 
    // response.end('response'); // 设置响应体并结束响应 返回loveloveresponse
    response.end(); // 一般来说如果在write中设置了响应体 end中不再设置响应体
})

server.listen(9000, () => {
    console.log('服务已经启动');
})
