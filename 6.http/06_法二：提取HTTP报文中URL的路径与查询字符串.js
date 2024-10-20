// 1. 导入 http 模块 和 url 模块
const http = require('http');
// 测试：http://localhost:9000/search?keyword=h5
// 2. 创建服务对象
const server = http.createServer((request, response) => {
    // 实例化 url 对象
    // let url = new URL("http://www.xxx.com:1111/search?a=100&b=231");
    // let url = new URL("/search?a=100&b=231", "http://www.xxx.com:1111");
    console.log(request.url); // /search?keyword=h5
    
    let url = new URL(request.url, "http://www.xxx.com:1111");
    console.log(url); // URL {...}
    // 输出路径
    console.log(url.pathname) // /search
    // 输出查询字符串
    console.log(url.searchParams.get('keyword')); // h5
    response.end('url new') // 设置响应体并结束响应
});

// 3. 监听端口，启动服务
server.listen(9000, () => {
    console.log('服务已经启动...');
})