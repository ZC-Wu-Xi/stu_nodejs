const http = require('http');

const server = http.createServer((request, response) => {
    response.setHeader('content-type','text/html;charset=utf-8'); // 防止中文乱码
    let url = new URL(request.url, 'http://192.168.0.1')
    // 请求方法 这里使用解构赋值获取
    let { method } = request;
    console.log(url.pathname);
    if (method === 'GET' && url.pathname === '/login') {
        response.end('登陆页面')
    } else if (method === 'GET' && url.pathname === "/reg") {
        response.end('注册页面')
    } else {
        response.end('not find')
    }
})

// 监听端口，启动服务
server.listen(9000, () => {
    console.log('服务已经启动...');
})