// - Node.js中不能使用BOM和DOM的API,可以使用console和定时器API
// - Node,js中的顶级对象为~~global~~(实测新版本可能无法使用该对象),也可以用**globalThis**访问顶级对象// 报错：
/*
ReferenceError: window is not defined 
    at Object.<anonymous> (D:\workspace\stuspace\webObject\nodejs\nodejs-shangguigu\注意\注意.js:1:13)
    at Module._compile (node:internal/modules/cjs/loader:1469:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1548:10)    
    at Module.load (node:internal/modules/cjs/loader:1288:32)
    at Module._load (node:internal/modules/cjs/loader:1104:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:174:12)
    at node:internal/main/run_main_module:28:49
*/

// // BOM
// console.log(window);
// // DOM
// console.log(document)
// console.log(history)
// console.log(location)
// console.log(navigator)
// // Ajax
// let xhr = new XMLHttpRequest();

// setTimeout(() => {
//   console.log('i love you')
// }, 1000) 
// global 顶级对象 高版本无法访问
// console.log(global)
console.log(globalThis)// 新版本用这个
/* 
globalThis打印：
<ref *1> Object [global] {
  global: [Circular *1],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  structuredClone: [Function: structuredClone],
  atob: [Getter/Setter],
  btoa: [Getter/Setter],
  performance: [Getter/Setter],       
  fetch: [Function: fetch],
  crypto: [Getter]
}
*/

// console.log(golbal == globalThis)// true