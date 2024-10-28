/**
 * 伪代码(不能执行的代码) 模拟 演示 导入模块
 */

function require(file) {
    // 1. 相对路径转为绝对路径，定位目标文件
    let absolutePath = path.resolve(__dirname, file);
    // 2. 缓存检测
    if (caches[absolutePath]) {
        return caches[absolutePath];
    }
    // 3. 读取文件的代码
    let code = fs.readFileSync(absolutePath).toString();
    // 4. 包裹为一个函数，然后执行
    let module = {}
    let exports = modules.exports = {}
    (function (exports, require, module, __filename, __dirname) {
        const test = {
            name: 'xi'
        }

        module.exports = test;
        // 输出
        console.log(arguments.callee.toString());

    })(exports, require, __filename, __dirname)
    // 5. 缓存结果
    caches[absolutePath] = module.exports;
    // 6. 返回 module.exports 的值
    return module.exports;
}

const m = require('./me.js')

