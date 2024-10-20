// 1. 导入 http 模块
const http = require('http');

// 使用02表单进行测试

// 2. 创建服务对象
const server = http.createServer((request, response) => {
    // 1. 声明一个变量
    let body = '';
    // 2. 绑定 data 事件获取request流中的数据
    request.on("data", chunk => { // request 本身就是一个可读流对象，通过data事件一点一点的将数据取出来
        body += chunk; // chunk 是一个buffer,与字符串进行加法运算会自动将 buffer 转为 字符串
    })
    // 3. 绑定 end 事件 可读流中的数据全部读完后触发 end 事件
    request.on('end', () => {
        console.log(body); // username=3342%E4%BA%8C%E5%8D%81%E5%A4%9A&password=ewa
        response.end('Hello Http') // 设置响应体并结束响应
    })
});

// 3. 监听端口，启动服务
server.listen(9000, () => {
    console.log('服务已经启动...');
})