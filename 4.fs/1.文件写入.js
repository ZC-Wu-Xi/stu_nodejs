/**
 * 需求：
 * 新建一个文件，座右铭.txt，写入内容：三人行，则必有我师焉
 */
 
// require 是 Node.js 环境中的'全局'变量，用来导入模块
const fs = require('fs');

/* 
// 2. 异步写入的文件 
// 如果文件不存在，则自动创建文件
fs.writeFile('./座右铭.txt', "三人行，则必有我师焉", err => {
    // 写入失败：err就是一个错误对象 写入成功：err就是null
    if (err) {
        console.log('写入失败')
        return;
    } else {
        console.log("写入成功");  
    }
})
console.log(1 + 1)
 */

// 2. 同步写入
// 如果文件不存在，则自动创建文件
fs.writeFileSync("./data.txt", "test");
console.log(1 + 1)