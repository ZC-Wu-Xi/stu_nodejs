//导入 fs
const fs = require('fs');
const path = require('path');
//写入文件
// fs.writeFileSync(__dirname + '/index.html', 'love');
console.log(__dirname + '/index.html');  // D:\workspace\stuspace\webObject\nodejs\nodejs-shangguigu\5.path/index.html

//resolve  解决
console.log(path.resolve(__dirname, './index.html'));  // D:\workspace\stuspace\webObject\nodejs\nodejs-shangguigu\5.path\index.html
// console.log(path.resolve(__dirname, 'index.html'));
// console.log(path.resolve(__dirname, '/index.html', './test'));

// sep 分隔符 返回不同系统的分隔符
console.log(path.sep); // windows时：\  Linux时：/

// parse 方法  解析路径并返回对象   __dirname  '全局变量'
console.log(__filename); // 文件的绝对路径
let str = 'D:\\nodeJS\\13-path\\代码\\path.js';
console.log(path.parse(str));  /* path.parse(str)：
                                    {
                                    root: 'D:\\',
                                    dir: 'D:\\nodeJS\\13-path\\代码',
                                    base: 'path.js',
                                    ext: '.js',
                                    name: 'path'
                                    }
                                */

// basename
console.log(path.basename(str)); // path.js

// dirname
console.log(path.dirname(str)); // D:\nodeJS\13-path\代码

// extname
console.log(path.extname(str)); // .js

