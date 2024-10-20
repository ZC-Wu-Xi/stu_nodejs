// 导入 http 模块
const http = require('http');
const fs = require('fs');

// 创建服务对象
const server = http.createServer((request, response) => {
    // 获取请求URL的路径
    
    let {pathname} = new URL(request.url, 'http://192.168.0.1');
    // let pathname = request.url
    // 读取文件内容
    if (pathname === '/') {
        // 读取文件内容
        let html = fs.readFileSync(__dirname + '/11_table.html') // 返回值是一个buffer
        // 设置响应体
        response.end(html) // 设置响应体 end的响应体可以是字符串也可以是一个buffer
        
    } else  if (pathname === '/11_index.css') {
          // 读取文件内容
          let css = fs.readFileSync(__dirname + '/11_index.css') // 返回值是一个buffer
          // 设置响应体
          response.end(css) // 设置响应体 end的响应体可以是字符串也可以是一个buffer
    } else if (pathname === '/11.index.js') {
        // 读取文件内容
        let js = fs.readFileSync(__dirname + '/11_index.js') // 返回值是一个buffer
        // 设置响应体
        response.end(js) // 设置响应体 end的响应体可以是字符串也可以是一个buffer
    } else {
        response.statusCode = 404;
        response.end('<h1>404 Not Found</h1>')
    }
})

server.listen(9000, () => {
    console.log('服务已经启动');
})
