// 导入模块
// const tiemo = require('./me.js');

// js文件省略后缀
const tiemo = require('./me');

// 导入json文件
const duanzi1 = require('./duanzi.json');
// json和js同名时优先导入js
const duanzi2 = require('./duanzi');
console.log(duanzi1);// {text:......}
console.log(duanzi2);// 我是个段子

//导入其他类型的文件
const test = require('./test.abc');
console.log(test); // 我是个测试


// 调用函数
tiemo(); // 贴膜...

