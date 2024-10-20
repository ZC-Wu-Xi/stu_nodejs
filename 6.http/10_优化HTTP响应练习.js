// 导入 http 模块
const http = require('http');
const fs = require('fs');

// 创建服务对象
const server = http.createServer((request, response) => {
    // 读取文件内容
    let html = fs.readFileSync(__dirname + '/10_table.html') // 返回值是一个buffer
    // 设置响应体
    response.end(html) // 设置响应体 end的响应体可以是字符串也可以是一个buffer
})

server.listen(9000, () => {
    console.log('服务已经启动');
})
