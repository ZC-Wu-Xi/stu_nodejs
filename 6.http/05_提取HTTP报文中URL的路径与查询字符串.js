// 1. 导入 http 模块 和 url 模块
const http = require('http');
const url = require('url');
// 测试：http://localhost:9000/search?keyword=h5
// 2. 创建服务对象
const server = http.createServer((request, response) => {
    console.log(request.url); //  /  /favicon.ico
    // 解析url
    let res = url.parse(request.url, true); // 使用第2个参数 true query属性会变成一个对象，方便操作；不加第2个参数query属性为字符串
    console.log(res)
    // 路径
    let pathname = res.pathname;
    console.log('pathname:' + pathname);
    // 查询字符串
    let keyword = res.query.keyword;
    console.log(keyword); // h5
    
    response.end('url') // 设置响应体并结束响应
});

// 3. 监听端口，启动服务
server.listen(9000, () => {
    console.log('服务已经启动...');
})