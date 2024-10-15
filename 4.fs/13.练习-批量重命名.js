// 1. 导入 fs 模块
const fs = require('fs');


// 读取 code 文件夹
const files = fs.readdirSync(`${__dirname}/`);

// 遍历数组 重命名
files.forEach(item => {
    // 拆分文件名  改名前文件名字：1.aaa.js
    let data = item.split('-');
    let [num, name1, name2] = data;
    console.log(num, name1, name2); // 1 aaa js
    // 判断
    if (Number(num) < 10) {
        num = '0' + num;
    }
    // 创建新文件名
    let newName = num + '.' + name1 + '.' + name2;
    // 重命名
    fs.renameSync(`${__dirname}/${item}`, `${__dirname}/${newName}`);
})
