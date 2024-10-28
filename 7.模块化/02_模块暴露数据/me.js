// 声明一个函数
function tiemo(){
    console.log("贴膜...");
}

function niejiao(){
    console.log("捏脚...");
}

// // 1. 暴露数据
// // 1.1 module.exports
// // 暴露一个
// // module.exports = timeo;
// // 暴露多个

// module.exports = {
//     tiemo,
//     niejiao
// }

// 1.2 export.nme
exports.niejiao = niejiao;
exports.tiemo = tiemo;
// // 1.2-1 `module.exports` 可以暴露 **任意** 数据
// module.exports = "1loveyou";
// module.exports = 123

// 1.2-2 不能使用`exports = value` 的形式暴露数据
// exports = aaa // 无法暴露