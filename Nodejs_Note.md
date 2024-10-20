---
author: 汐
mail: 1302344595@qq.com
---

[b站传送门-nodejs尚硅谷](https://www.bilibili.com/video/BV1gM411W7ex?p=1)

## node介绍

Node.js 是一个开源的、跨平台的 JavaScript 运行时环境。

[nodejs下载](https://nodejs.org/en/download/prebuilt-installer)

使用`node 文件名`在命令行运行js代码

注意事项

- Node.js中不能使用BOM和DOM的API,可以使用console和定时器API
- Node,js中的顶级对象为~~global~~(实测新版本可能无法使用该对象),也可以用**globalThis**访问顶级对象

## 一. Buffer(缓冲器)模块

### 1. 概念

Buffer 是一个类似于数组的**对象** ，用于表示固定长度的字节序列。Buffer 本质是一段内存空间，专门用来处理**二进制数据** 。

![image-20240928143104996](./Nodejs_NoteImg/image-20240928143104996.png)

### 2. 特点

1. Buffer 大小固定且无法调整
2. Buffer 性能较好，可以直接对计算机内存进行操作
3. 每个元素的大小为 1 字节（byte）

![image-20240928143155388](./Nodejs_NoteImg/image-20240928143155388.png)

### 3. 使用

#### 3-1. 创建 Buffer

Node.js 中创建 Buffer 的方式主要如下几种：

1. Buffer.alloc
   ```javascript
   //创建了一个长度为 10 字节的 Buffer，相当于申请了 10 字节的内存空间，每个字节的值为 0
   let buf_1 = Buffer.alloc(10); // 结果为 <Buffer 00 00 00 00 00 00 00 00 00 00>
   ```

2. Buffer.allocUnsafe
   ```javascript
   //创建了一个长度为 10 字节的 Buffer，buffer 中可能存在旧的数据, 可能会影响执行结果，所以叫
   unsafe
   let buf_2 = Buffer.allocUnsafe(10);
   ```

3. Buffer.from
   ```js
   //通过字符串创建 Buffer
   let buf_3 = Buffer.from('hello');
   //通过数组创建 Buffer
   let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117])
   ```

#### 3-2 Buffer 与字符串的转化

我们可以借助 toString 方法将 Buffer 转为字符串

```js
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
console.log(buf_4.toString())// iloveyou
```

> toString 默认是按照 utf-8 编码方式进行转换的。

#### 3-3 Buffer 的读写

Buffer 可以直接通过 [] 的方式对数据进行处理。

```js
//读取
console.log(buf_3[1]);
//修改
buf_3[1] = 97;
//查看字符串结果
console.log(buf_3.toString())
```

> 注意:
>
> 1. 如果修改的数值超过 255 ，则超过 8 位数据会被舍弃
> 2. 一个 utf-8 的字符一般占 3 个字节

#### 3-4 Buffer 的溢出和中文

```js
// 溢出
let buf = Buffer.from('hello');
buf[0]=361;//舍弃高位的数字 只保留8位 高位归0 0001 0110 1001 => 0110 1001
console.log(buf)//<Buffer 69 65 6c 6c 6f>
```

```js
// 中文
let bufch = Buffer.from('你好')// 这里的中文是utf8编码 一个中文占三个字节
console.log(bufch)// <Buffer e4 bd a0 e5 a5 bd>
```

## 二. fs(文件系统)模块

fs 全称为**file system** ，称之为**文件系统** ，是 Node.js 中的**内置模块** ，可以对计算机中的磁盘进行操作。

fs模块可以实现与硬盘的交互，例如：文件的创建、删除、重命名、移动，还有文件内容的写入、读取，以及文件夹的相关操作

### 1. 文件写入

文件写入就是将**数据**保存到**文件**中，我们可以使用如下几个方法来实现该效果

| 方法                        | 说明     |
| --------------------------- | -------- |
| writeFile                   | 异步写入 |
| writeFileSync               | 同步写入 |
| appendFile / appendFileSync | 追加写入 |
| createWriteStream           | 流式写入 |

#### 1-1 writeFile 异步写入

语法：`fs.writeFile(file, data[, options], callback)`

参数说明：

- file 文件名
- data 待写入的数据
- options 选项设置 （可选）
  - **`encoding`**：指定写入文件时的字符编码，默认值是 `'utf8'`。可以设置为 `'ascii'`、`'base64'`、`'latin1'`、`'utf16le'`、`'ucs2'`、`'hex'` 等。
  - **`mode`**：设置文件的权限（Unix 文件模式），默认值为 `0o666`（可读可写）。它控制文件创建时的权限。
  - **`flag`**：指定文件打开的模式，比如 `'a'`、`'w'`、`'r'` 等。
    1. `'a'`：表示以**追加模式**（append）打开文件。如果文件已存在，内容会被追加到文件末尾；如果文件不存在，则会创建一个新文件。
    2. `'w'`：表示以写入模式（write）打开文件，默认就是该模式。如果文件已存在，文件内容会被清空并重新写入；如果文件不存在，则会创建一个新文件。
    3. `'r'`：表示以读取模式（read）打开文件。此模式用于读取文件内容，通常与写入无关。
    4. `'r+'`：表示以读写模式打开文件。文件必须存在，允许同时读取和写入。
    5. `'w+'`：表示以读写模式打开文件。如果文件存在，内容会被清空；如果文件不存在，则会创建一个新文件。
    6. `'a+'`：表示以追加读写模式打开文件。如果文件存在，内容会被追加；如果文件不存在，则会创建一个新文件。
- callback 写入回调

返回值： undefined

代码示例：
```js
// require 是 Node.js 环境中的'全局'变量，用来导入模块
const fs = require('fs');
//将 『三人行，必有我师焉。』 写入到当前文件夹下的『座右铭.txt』文件中 如果文件不存在，则自动创建文件
fs.writeFile('./座右铭.txt', '三人行，必有我师焉。', err => {
	//如果写入失败，则回调函数调用时，会传入错误对象，如写入成功，会传入 null
    if(err){
        console.log(err);
        return;
    } 
    console.log('写入成功')；
});
```

#### 1-2 writeFileSync 同步写入

语法：`fs.writeFileSync(file, data[, options])`

参数：与 `fs.writeFile` 大体一致，只是没有 `callback` 参数

返回值： undefined

代码示例：

```js
try{
	fs.writeFileSync('./座右铭.txt', '三人行，必有我师焉。');
}catch(e){
	console.log(e);
}
```

> Node.js 中的磁盘操作是由其他 线程 完成的，结果的处理有两种模式：
>
> - 同步处理 JavaScript 主线程**会等待**其他线程的执行结果，然后再继续执行主线程的代码，**效率较低**
> - 异步处理 JavaScript 主线程**不会等待**其他线程的执行结果，直接执行后续的主线程代码，**效率较好**

#### 1-3. appendFile/appendFileSync 追加写入

appendFile 作用是在**文件尾部追加内容**，appendFile 语法与 writeFile 语法完全相同

语法:

- `fs.appendFile(file, data[, options], callback)`
- `fs.appendFileSync(file, data[, options])`

此外还可以使用writeFile的追加写入模式进行追加

- `fs.writeFile(file, data, {flag: 'a'}, callback)`

返回值： 二者都为 undefined

实例代码：

fs.appendFile异步方式追加写入：

```js
fs.appendFile('./座右铭.txt','择其善者而从之，其不善者而改之。', err => {
if(err) throw err;
console.log('追加成功')
});
```

fs.appendFileSync同步方式追加写入：

```js
fs.appendFileSync('./座右铭.txt','\r\n温故而知新, 可以为师矣');
```

异步 writeFile方式追加写入 flag: a 表示以追加模式写入:

```js
fs.writeFile('./座右铭.txt', 'love love love', {flag: 'a'}, err => {
    if (err) {
        console.log('写入失败');
        return
    }
    console.log('写入成功');
})
```

#### 1-4. createWriteStream 流式写入

语法：`fs.createWriteStream(path[, options])`

参数说明：

- path 文件路径
- options 选项配置（ 可选 ）

返回值：`Object`

代码示例：

```js
// 1. 导入fs
const fs = require('fs')
// 2. 创建写入流对象
const ws = fs.createWriteStream('./观书有感.txt');
// 3. write
ws.write('半亩方塘一鉴开，')
ws.write('天光云影共徘徊。\r\n')
ws.write('问渠哪得清如许？')
ws.write('为有源头活水来。\r\n')
// 4. 关闭通道
// ws.close();
ws.end()
```

> 关闭流两种方法的区别
>
> - `ws.end()`:此方法用于结束可写流，用户可以在此处选择性地写入数据。调用 `end()` 会触发流的结束，同时确保所有待写入的数据都被写入。你可以在 `end()` 方法中传递一个字符串作为最后写入的数据，也可以不传递，直接结束流。它会自动关闭流。
>   - 示例：
>     `ws.end('这是最后一行。\r\n'); ` 
> - `ws.close()`:此方法直接关闭流，不会处理待写入的数据。它是一个更低级的操作，通常不建议在写入流时直接使用，因为如果在 close() 被调用时还有数据未写入，可能会导致数据丢失。
>
> 一般情况下，推荐使用 `ws.end() `来优雅地结束写入流，确保所有数据都已写入并处理完毕。如果你只是想立即关闭流，而不关心是否有数据未写入，可以使用 `ws.close()`。

> **程序打开一个文件是需要消耗资源的**，流式写入可以减少打开关闭文件的次数。流式写入方式适用于**大文件写入或者频繁写入**的场景, writeFile 适合于**写入频率较低的场景**

#### 1-5 写入文件的场景 

文件写入 在计算机中是一个非常常见的操作，下面的场景都用到了文件写入

- 下载文件
- 安装软件
- 保存程序日志，如 Git
- 编辑器保存文件
- 视频录制

> 当**需要持久化保存数据**的时候，应该想到**文件写入**  

### 2. 文件读取

文件读取顾名思义，就是通过程序从文件中取出其中的数据，我们可以使用如下几种方式：

| 方法                | 说明     |
| ------------------- | -------- |
| `readFile `         | 异步读取 |
| `readFileSync `     | 同步读取 |
| `createReadStream ` | 流式读取 |

#### 2-1 readFile 异步读取

语法： `fs.readFile(path[, options], callback)`

参数说明：

- `path` 文件路径
- `options` 选项配置
- `callback` 回调函数

返回值： `undefined`

代码示例：

```js
// 1. 引入 fs 模块
const { log } = require('console');
const fs = require('fs');
// 2. 异步读取
fs.readFile('./观书有感.txt', (err, data) => {
    if (err) {
        console.log('读取失败~~');
        return;
    }
    console.log(data);// 直接打印是buffer
    console.log("data:\n" + data);// 打印内容 进行字符串拼接，Buffer自动转换为字符串，输出的是文件的实际内容。
    console.log("data.toString():\n" + data.toString());// 打印文件内容
})
```

#### 2-2 readFileSync 同步读取

语法：`fs.readFileSync(path[, options])`

参数说明：

- path 文件路径
- options 选项配置

返回值： `string | Buffer`

代码示例：

```js
let data = fs.readFileSync('./观书有感.txt')
console.log(data);// 打印buffer
console.log("readFileSync:" + data);// 打印内容 进行字符串拼接，Buffer自动转换为字符串，输出的是文件的实际内容。
console.log(data.toString());// 打印内容
```

#### 2-3 createReadStream 流式读取

语法： `fs.createReadStream(path[, options])`

参数说明：

- `path` 文件路径
- `options` 选项配置（ 可选 ）

返回值： `Object`

代码示例：

```JS
//创建读取流对象
let rs = fs.createReadStream('./观书有感.txt');
//每次取出 64k 数据后执行一次 data 回调
rs.on('data', chunk => {
    // console.log(chunk);// buffer 数据
    console.log(chunk.length);// 每次65536 字节 => 64kb
})
// end 回调 (可选) 该回调函数在读取完成后调用
rs.on('end', () => {
	console.log('读取完成')
})
```



#### 2-4 读取文件应用场景

- 电脑开机
- 程序运行
- 编辑器打开文件
- 查看图片
- 播放视频
- 播放音乐
- Git 查看日志
- 上传文件
- 查看聊天记录

#### 2-t 练习-文件复制

需求:复制【资料】文件夹下的【demo1.mp4】文件
```js
// 导入文件模块fs
const fs = require('fs');
const process = require('process');// 这个模块在这里是测试占用内存大小的

/* 
// 方式一：readFile
// 1. 读取文件内容
let data = fs.readFileSync('../资料/demo1.mp4')
// 2. 写入文件
fs.writeFileSync('../资料/demo1-copy1.mp4', data);
// 占用内存大小
console.log(process.memoryUsage());// 36802560 字节 -> 35MB
 */

// 方式二：流式操作
// 1. 创建读取流对象
const rs = fs.createReadStream('../资料/demo1.mp4');
// 2. 创建一个写入流对象
const ws = fs.createWriteStream('../资料/demo1-copy2.mp4')
/* 
// 3. 复制 绑定 data 事件 读一块写一块
rs.on('data', chunk => {
    ws.write(chunk);
})

rs.on('end', () => {
    // 占用内存大小
    console.log(process.memoryUsage());// 34070528 字节 -> 32MB// 文件越大流式传输占用的空间较普通的传输方式节省越多
})
 */

// 3. 复制 pipe这种方式用的不多
rs.pipe(ws);
```

### 3. 文件移动与重命名

在 Node.js 中，我们可以使用`rename`或`renameSync`来移动或重命名文件或文件夹

语法：

- `fs.rename(oldPath, newPath, callback)` 
- `fs.renameSync(oldPath, newPath)`

参数说明：

- `oldPath` 文件当前的路径
- `newPath` 文件新的路径
- `callback` 操作后的回调

代码示例：

```js
// 1. 导入 fs 模块
const fs = require('fs');

// 2. 文件重命名
fs.rename('./座右铭.txt', './论语.txt', err => {
    if (err) {
        console.log("操作失败~");
        return;
    }
    console.log("操作成功~");
})


// 3. 文件的移动
fs.rename('./data.txt', '../资料/data.txt', err => {
    if (err) {
        console.log("操作失败~");
        return;
    }
    console.log("操作成功~");
})
```

### 4. 文件删除

在 Node.js 中，我们可以使用 `unlink` 或 `unlinkSync` 来删除文件

语法：

- `fs.unlink(path, callback)` 

- `fs.unlinkSync(path)`

参数说明：

- `path` 文件路径
- `callback` 操作后的回调代码示例：

> 注：在v14.4版本及其以上也可以使用`rm`或`rmSync`来删除文件，参数同上

```js
// 1. 导入 fs 模块
const fs = require('fs');

// 2.1 调用 unlink 方法删除文件  unlinkSync
fs.unlink('./观书有感.txt', err => {
    if (err) {
        console.log('删除失败~');
        return;
    }
    console.log('删除成功~');
});

// 2.2 调用 rm 方法删除文件(v14.4+)  rmSync
fs.rm('./论语.txt', err => {
    if (err) {
        console.log('删除失败~');
        return;
    }
    console.log('删除成功~');
});

// 2.3 读取文件夹
fs.readdir('../资料', (err, data) => {
    if (err) {
        console.log('读取失败~');
        return;
    }
    console.log('读取成功：' + data);  // 读取成功：data.txt,demo1.mp4
}) 
```

### 5. 文件夹操作

借助 Node.js 的能力，我们可以对文件夹进行 创建 、 读取 、 删除 等操作  

| 方法                                 | 说明       |
| ------------------------------------ | ---------- |
| `mkdir` / `mkdirSync `               | 创建文件夹 |
| `readdir` / `readdirSync `           | 读取文件夹 |
| `rmdir` / `rmdirSync `/`rm`/`rmSync` | 删除文件夹 |

#### 5.1 `mkdir` 创建文件夹

在 Node.js 中，我们可以使用 `mkdir` 或 `mkdirSync` 来创建文件夹

语法：

- `fs.mkdir(path[, options], callback) `
- `fs.mkdirSync(path[, options])`

参数说明：

- `path` 文件夹路径
- `options` 选项配置（ 可选 ）
- `callback` 操作后的回调

示例代码：

```js
// 创建文件夹  mk  make 制作  dir directory 文件夹
fs.mkdir('./html', err => {
    if (err) {
        console.log('创建失败~');
        return;
    }
    console.log('创建成功~');
})

// 递归创建 {recursive: true}开启递归创建
fs.mkdir('./a/b/c', {recursive: true}, err => {
    if (err) {
        console.log('创建失败~');
        return;
    }
    console.log('创建成功~');
})
```

#### 5.2 `readdir` 读取文件夹

在 Node.js 中，我们可以使用 `readdir` 或 `readdirSync` 来读取文件夹

语法：

- `fs.readdir(path[, options], callback)`
- ` fs.readdirSync(path[, options])`

参数说明：

- `path` 文件夹路径\
- `options` 选项配置（ 可选 ）
- `callback` 操作后的回调

示例代码：

```js
fs.readdir('../资料', (err, data) => {
    if (err) {
        console.log('读取失败~');
        return;
    }
    console.log('读取成功：' + data);  // 读取成功：data.txt,demo1.mp4
}) 
```

#### 5.3 `rmdir`/`rm` 删除文件夹

在 Node.js 中，我们可以使用` rmdir` 或 `rmdirSync` 来删除文件夹

语法：

- `fs.rmdir(path[, options], callback) `
- `fs.rmdirSync(path[, options])`

参数说明：

- `path` 文件夹路径
- `options` 选项配置（ 可选 ）
- ` callback` 操作后的回调

示例代码：

```js
// 2.4 删除文件夹
fs.rmdir('./html', err => {
    if (err) {
        console.log('删除失败~');
        return;
    }
    console.log('删除成功');  // 读取成功：data.txt,demo1.mp4
})

// 2.5 递归删除文件夹  rmdir不推荐使用 会有警告 提示rmdir方法可能在将来会被删除 建议用rm删除文件夹
fs.rmdir('./a', {recursive: true}, err => {
    if (err) {
        console.log('删除失败~' + err);
        return;
    }
    console.log('删除成功');  // 读取成功：data.txt,demo1.mp4
})

// 2.6 递归删除文件夹  rm删除文件夹 建议使用这个
fs.rm('./a', {recursive: true}, err => {
    if (err) {
        console.log('删除失败~' + err);
        return;
    }
    console.log('删除成功');  // 读取成功：data.txt,demo1.mp4
})
```

### 6. 查看资源状态 

在 Node.js 中，我们可以使用` stat` 或 `statSync` 来查看资源的详细信息

语法：

- `fs.stat(path[, options], callback) `
- `fs.statSync(path[, options])`

参数说明：

- `path` 文件夹路径
- `options` 选项配置（ 可选 ） 
- `callback `操作后的回调

示例代码：

```js
// 1. 导入 fs 模块
const fs = require('fs');

// stat 方法  status 缩写 状态
fs.stat('../资料/demo1.mp4', (err, data) => {
    if (err) {
        console.log('操作失败');
        return;
    }
    console.log(data);
    /*
    Stats {
        dev: 2055620328,
        mode: 33206,
        nlink: 1,
        uid: 0,
        gid: 0,
        rdev: 0,
        blksize: 4096,
        ino: 562949953738064,
        size: 11546856,
        blocks: 22560,
        atimeMs: 1727592074068.7017,
        mtimeMs: 1727590366724.0388,
        ctimeMs: 1727590434360.618,
        birthtimeMs: 1727590429396.402,
        atime: 2024-09-29T06:41:14.069Z,
        mtime: 2024-09-29T06:12:46.724Z,
        ctime: 2024-09-29T06:13:54.361Z,
        birthtime: 2024-09-29T06:13:49.396Z
    }
    */

    // isFile 是否是文件
    console.log(data.isFile());  // true

    // isDirectory  是否是文件夹
    console.log(data.isDirectory());  // false
})
```

data结果值对象结构：

- `size` 文件体积
- `birthtime` 创建时间
- `mtime` 最后修改时间
- `isFile` 检测是否为文件
- `isDirectory` 检测是否为文件夹
- ……

### 7. 相对路径问题

fs 模块对资源进行操作时，路径的写法有两种：

1. 相对路径
   - `./座右铭.txt` 当前目录下的`座右铭.txt`
   - `座右铭.txt` 等效于上面的写法
   - `../座右铭.txt` 当前目录的上一级目录中的`座右铭.txt`
2. 绝对路径
   - `D:/Program Files` windows 系统下的绝对路径
   - `/usr/bin` Linux 系统下的绝对路径

```js
// 1. 导入 fs 模块
const fs = require('fs');

// 相对路径 bug：相对路径参照物: 参照的是命令行的工作目录,不是该文件的所在目录
fs.writeFileSync('./index.html', 'love');  // (命令行工作文件夹)当前文件夹
fs.writeFileSync('index.html', 'love'); // (命令行工作文件夹)当前文件夹

// 绝对路径
fs.writeFileSync('D:/index.html', 'love');
fs.writeFileSync('/index.html', 'love'); // 盘符最外层
```

> 相对路径中所谓的 当前目录 ，指的是 命令行的工作目录 ，而并非是文件的所在目录所以当命令行的工作目录与文件所在目录不一致时，会出现一些 **BUG**，可以使用**`__dirname`**解决bug

bug 及 解决方式：

```js
// bug  相对路径参照物: 参照的是命令行的工作目录,不是该文件的所在目录
fs.writeFileSync('/index.html', 'love');

// 绝对路径 '全局变量' 保存的是所在文件的所在目录的绝对路径
console.log(__dirname);  // D:\workspace\stuspace\webObject\nodejs\nodejs-shangguigu\4.fs
// 解决 bug: 使用绝对路径
fs.writeFileSync(__dirname + '/index.html', 'love');
```

### 8. 批量重命名

```js
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

```

## 三. path(操作路径)模块

path 模块提供了操作路径的功能，我们将介绍如下几个较为常用的几个 API：  

| API              | 说明                     |
| ---------------- | ------------------------ |
| `path.resolve `  | 拼接规范的绝对路径 常用  |
| `path.sep `      | 获取操作系统的路径分隔符 |
| `path.parse `    | 解析路径并返回对象       |
| `path.basename ` | 获取路径的基础名称       |
| `path.dirname `  | 获取路径的目录名         |
| `path.extname `  | 获得路径的扩展名         |

代码示例：  

```js
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
```

## 四.HTTP 协议  

### 1. 概念

HTTP（hypertext transport protocol）协议；中文叫**超文本传输协议**，是一种基于TCP/IP的应用层通信协议，这个协议详细规定了 `浏览器` 和`万维网` 服务器 之间互相通信的规则。

协议中主要规定了两个方面的内容:

- 客户端：用来向服务器发送数据，可以被称之为**请求报文**
- 服务端：向客户端返回数据，可以被称之为响应**报文报文**

> 报文：可以简单理解为就是一堆字符串 

### 2. 请求报文的组成

![image-20241015174628158](./Nodejs_NoteImg/image-20241015174628158.png)

- 请求行
- 请求头
- 空行
- 请求体

### 3. HTTP 的请求行

- 请求方法（get、post、put、delete等）
- 请求 URL（统一资源定位器）
  例如：http://www.baidu.com:80/index.html?a=100&b=200#logo 
  - http： 协议（https、ftp、ssh等）
  - www.baidu.com 域名
  - 80 /index.html a=100&b=200 #logo
  - 端口号路径查询字符串哈希（锚点链接）
-  HTTP协议版本号

### 4. HTTP 请求头

格式：`头名：头值`

**常见的请求头有：**

| 请求头                    | 解释                                                         |
| ------------------------- | ------------------------------------------------------------ |
| `Host`                    | 主机名                                                       |
| `Connection`              | 连接的设置 keep-alive（保持连接）；close（关闭连接）         |
| `Cache-Control`           | 缓存控制 max-age = 0 （没有缓存）                            |
| `UpgradeInsecureRequests` | 将网页中的http请求转化为https请求（很少用）老网站升级        |
| `User-Agent`              | 用户代理，客户端字符串标识，服务器可以通过这个标识来识别这个请求来自哪个客户端 ，一般在PC端和手机端的区分 |
| `Accept`                  | 设置浏览器接收的数据类型                                     |
| `Accept-Encoding`         | 设置接收的压缩方式                                           |
| `AcceptLanguage`          | 设置接收的语言 q=0.7 为喜好系数，满分为1                     |
| `Cookie`                  | 后面单独讲                                                   |

### 5. HTTP 的请求体

请求体内容的格式是非常灵活的， 

- （可以是空）=\=> GET请求
- （也可以是字符串，还可以是JSON）=\=> POST请求

例如：

- 字符串：`keywords=手机&price=2000`
- JSON：`{"keywords":"手机","price":2000}`

### 6. 响应报文的组成

![image-20241015174901599](./Nodejs_NoteImg/image-20241015174901599.png)

**响应行：**

```shell
HTTP/1.1 200 OK
```

- `HTTP/1.1`：HTTP协议版本号
- `200`：响应状态码 `404` Not Found, `500` Internal Server Error
  还有一些状态码，参考：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status 
- `OK`：响应状态描述

> 响应状态码和响应字符串关系是一一对应的。

**响应头：**

```shell
Cache-Control:缓存控制 private 私有的，只允许客户端缓存数据
Connection 链接设置
Content-Type:text/html;charset=utf-8 设置响应体的数据类型以及字符集,响应体为html，字符集
utf-8
Content-Length:响应体的长度，单位为字节
```

- 空行
- 响应体

响应体内容的类型是非常灵活的，常见的类型有 HTML、CSS、JS、图片、JSON

### 7. 创建 HTTP 服务

使用 nodejs 创建 HTTP 服务

#### 7.1 操作步骤

```js
//1. 导入 http 模块
const http = require('http');
//2. 创建服务对象 create 创建 server 服务
// request 意为请求. 是对请求报文的封装对象, 通过 request 对象可以获得请求报文的数据
// response 意为响应. 是对响应报文的封装对象, 通过 response 对象可以设置响应报文
const server = http.createServer((request, response) => {
	response.setHeader('content-type','text/html;charset=utf-8'); // 防止中文乱码
    response.end('你好，欸嘿嘿'); // 设置响应体并结束响应

});
//3. 监听端口, 启动服务
server.listen(9000, () => {
console.log('服务已经启动, 端口 9000 监听中...');
});
```

> http.createServer 里的回调函数的执行时机： **当接收到 HTTP 请求的时候，就会执行**  

#### 7.2 测试

浏览器请求对应端口：http://127.0.0.1:9000  

#### 7.3 注意事项

1. 命令行`ctrl + c `停止服务

2. 当服务启动后，若更新代码，**必须重启服务才能生效**

3. 响应内容中文乱码的解决办法
   ```java
   response.setHeader('content-type','text/html;charset=utf-8');
   ```

4.  端口号被占用
   ```shell
   Error: listen EADDRINUSE: address already in use :::9000
   ```

   - 关闭当前正在运行监听端口的服务 （ 使用较多 ）
   - 修改其他端口号

5. HTTP 协议默认端口是 80 。HTTPS 协议的默认端口是 443, HTTP 服务开发常用端口有 3000，8080，8090，9000 等

   > 如果端口被其他程序占用，可以使用 **资源监视器** 找到占用端口的程序，然后使用 **任务管理器** 关闭对应的程序

### 8. 获取 HTTP 请求报文

想要获取请求的数据，需要通过`request`对象

| 含义               | 语法                                                         |
| ------------------ | ------------------------------------------------------------ |
| **请求方法**       | `request.method `                                            |
| 请求版本           | `request.httpVersion`                                        |
| **请求路径**       | `request.url `                                               |
| **URL 路径**       | `require('url').parse(request.url).pathname `                |
| **URL 查询字符串** | `require('url').parse(request.url, true).query `             |
| **请求头**         | `request.headers `                                           |
| 请求体             | `request.on('data', function(chunk){})` <br />`request.on('end', function(){});` |

注意事项：

1. `request.url` 只能获取路径以及查询字符串，无法获取 URL 中的域名以及协议的内容
2. `request.headers` 将请求信息转化成一个对象，并将属性名都转化成了『小写』
3. 关于路径：如果访问网站的时候，只填写了 IP 地址或者是域名信息，此时请求的路径为『` / `』
4. 关于 favicon.ico：这个请求是属于浏览器自动发送的请求

```js
// 1. 导入 http 模块
const http = require('http');

// 2. 创建服务对象
const server = http.createServer((request, response) => {
    // 获取请求的方法
    console.log(request.method);  // GET
    // 获取请求的 url
    console.log(request.url); // /favicon.ico 只包含 url 中的路径和查询字符串
    // 获取 HTTP 协议的版本号 
    console.log(request.httpVersion); // 1.1
    // 获取 HTTP 请求头
    console.log(request.headers);
    // 获取请求头的指定属性
    console.log(request.headers.host); // 127.0.0.1:9000
    response.end('你好，欸嘿嘿'); // 设置响应体并结束响应
    
    // 获取 HTTP 请求体
    // 1. 声明一个变量
    let body = '';
    // 2. 绑定 data 事件获取request流中的数据
    request.on("data", chunk => { // request 本身就是一个可读流对象，通过data事件一点一点的将数据取出来
        body += chunk; // chunk 是一个buffer,与字符串进行加法运算会自动将 buffer 转为 字符串
    })
    // 3. 绑定 end 事件 可读流中的数据全部读完后触发 end 事件
    request.on('end', () => {
        console.log(body); // username=4121&password=ewa
        response.end('Hello Http') // 设置响应体并结束响应
    })
});

// 3. 监听端口，启动服务
server.listen(9000, () => {
    console.log('服务已经启动...');
})
```

**提取url路径和查询字符串例：**

法一：

```js
// 1. 导入 http 模块 和 url 模块
const http = require('http');
const url = require('url');
// 测试：http://localhost:9000/search?keyword=h5
// 2. 创建服务对象
const server = http.createServer((request, response) => {
    console.log(request.url); //  /  /favicon.ico
    // 解析url
    let res = url.parse(request.url, true); // 使用第2个参数 true query属性会变成一个对象，方便操作；不加第2个参数query属性为字符串
    console.log(res)
    // 路径
    let pathname = res.pathname;
    console.log('pathname:' + pathname);
    // 查询字符串
    let keyword = res.query.keyword;
    console.log(keyword); // h5
    
    response.end('url') // 设置响应体并结束响应
});

// 3. 监听端口，启动服务
server.listen(9000, () => {
    console.log('服务已经启动...');
})
```

法二：

```js
// 1. 导入 http 模块 和 url 模块
const http = require('http');
// 测试：http://localhost:9000/search?keyword=h5
// 2. 创建服务对象
const server = http.createServer((request, response) => {
    // 实例化 url 对象
    // let url = new URL("http://www.xxx.com:1111/search?a=100&b=231");
    // let url = new URL("/search?a=100&b=231", "http://www.xxx.com:1111");
    
    console.log(request.url); // /search?keyword=h5
    let url = new URL(request.url, "http://www.xxx.com:1111");
    console.log(url); // URL {...}
    // 输出路径
    console.log(url.pathname) // /search
    // 输出查询字符串
    console.log(url.searchParams.get('keyword')); // h5
    response.end('url new') // 设置响应体并结束响应
});
// 3. 监听端口，启动服务
server.listen(9000, () => {
    console.log('服务已经启动...');
})
```

### 9. HTTP 请求练习

按照以下要求搭建 HTTP 服务

| 请求类型(方法) | 请求地址 | 响应体结果 |
| -------------- | -------- | ---------- |
| get            | /login   | 登录页面   |
| get            | /reg     | 注册页面   |

```js
const http = require('http');

const server = http.createServer((request, response) => {
    response.setHeader('content-type','text/html;charset=utf-8'); // 防止中文乱码
    let url = new URL(request.url, 'http://192.168.0.1')
    // 请求方法 这里使用解构赋值获取
    let { method } = request;
    console.log(url.pathname);
    if (method === 'GET' && url.pathname === '/login') {
        response.end('登陆页面')
    } else if (method === 'GET' && url.pathname === "/reg") {
        response.end('注册页面')
    } else {
        response.end('not find')
    }
})

// 监听端口，启动服务
server.listen(9000, () => {
    console.log('服务已经启动...');
})
```

### 10. 设置 HTTP 响应报文  

| 作用             | 语法                                       |
| ---------------- | ------------------------------------------ |
| 设置响应状态码   | `response.statusCode`                      |
| 设置响应状态描述 | `response.statusMessage （ 用的非常少 ）`  |
| 设置响应头信息   | `response.setHeader('头名', '头值')`       |
| 设置响应体       | `response.write('xx') response.end('xxx')` |

```js
// 导入 http 模块
const http = require('http');

// 创建服务对象
const server = http.createServer((request, response) => {
    // 1. 设置响应状态码
    response.statusCode = 203;
    // 2. 设置响应状态描述
    response.statusMessage = "i love you";
    // 3. 设置响应头
    response.setHeader('content-type','text/html;charset=utf-8'); // 防止中文乱码
    // response.setHeader('content-type', 'html/text');
    // response.setHeader('Server', 'Node.js');
    response.setHeader('myHeader', 'test test test')
    response.setHeader('test', ['a', 'b', 'c']); // 设置多个同名响应头
    // 4. 设置响应体
    response.write('love'); // 设置响应体 
    response.write('love'); // 设置响应体 
    // response.end('response'); // 设置响应体并结束响应 返回loveloveresponse
    response.end(); // 一般来说如果在write中设置了响应体 end中不再设置响应体
})

server.listen(9000, () => {
    console.log('服务已经启动');
})
```

### 11. HTTP 响应练习

搭建 HTTP 服务，响应一个 4 行 3 列的表格，并且要求表格有**隔行换色**效果 ，且点击单元格能**高亮显示**  

```js
// 导入 http 模块
const http = require('http');

// 创建服务对象
const server = http.createServer((request, response) => {
    response.setHeader('test', ['a', 'b', 'c']); // 设置多个同名响应头
    // 设置响应体
    response.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                td {
                    padding:20px 40px;
                }
                /* 所有的奇数行 */
                table tr:nth-child(odd) { 
                    background: #aef;
                }
                /* 所有的偶数行 */
                table tr:nth-child(even) {
                    background: #fcb;
                }
                table, td {
                    border-collapse: collapse
                }
            </style>
        </head>
        <body>
            <table border = "1">
                <tr><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td></tr>
            </table>
            <script>
                // 获取所有的td
                let tds = document.querySelectorAll("td");
                // 遍历
                tds.forEach(item => {
                    item.onclick = function() {
                        this.style.background = "#222";
                    }
                })
            </script>
        </body>
        </html>
        `)
})

server.listen(9000, () => {
    console.log('服务已经启动');
})
```

### 12. 网页资源加载的基本过程

网页资源的加载都是循序渐进的，首先获取 HTML 的内容， 然后解析 HTML 在发送其他资源的请求，如CSS，Javascript，图片等。 

### 13. HTTP 响应练习扩展

将css js html分别创建为新的文件，当需要某个资源时浏览器会发送请求找到这个资源

```js
// 导入 http 模块
const http = require('http');
const fs = require('fs');

// 后面有优化
// 创建服务对象
const server = http.createServer((request, response) => {
    // 获取请求URL的路径
    
    let {pathname} = new URL(request.url, 'http://192.168.0.1');
    // let pathname = request.url
    // 读取文件内容
    let html = fs.readFileSync(__dirname + '/11_table.html') // 返回值是一个buffer
    if (pathname === '/') {
        // 读取文件内容
        let html = fs.readFileSync(__dirname + '/11_table.html') // 返回值是一个buffer
        // 设置响应体
        response.end(html) // 设置响应体 end的响应体可以是字符串也可以是一个buffer
        
    } else if (pathname === '/11_index.css') {
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
```

### 14. 静态资源服务

静态资源是指**内容长时间不发生改变的资源** ，例如图片，视频，CSS 文件，JS文件，HTML文件，字体文件等

动态资源是指**内容经常更新的资源** ，例如百度首页，网易首页，京东搜索列表页面等

#### 14.1 网站根目录或静态资源目录

HTTP 服务在哪个文件夹中寻找静态资源，那个文件夹就是 **静态资源目录** ，也称之为 **网站根目录**

> 思考：vscode 中使用 live-server 访问 HTML 时， 它启动的服务中网站根目录是谁？  

#### 14.2 网页中的 URL

网页中的 URL 主要分为两大类：相对路径与绝对路径

##### 14.2.1 绝对路径

绝对路径可靠性强，而且相对容易理解，在项目中运用较多

| 形式              | 特点                                                         |
| ----------------- | ------------------------------------------------------------ |
| http://xxx.com/aa | 直接向目标资源发送请求，容易理解。网站的外链会用到此形式     |
| //xxx.com/aa      | 与页面 URL 的协议拼接形成完整 URL 再发送请求。大型网站用的比较多 |
| /aa               | 与页面 URL 的协议、主机名、端口拼接形成完整 URL 再发送请求。中小型网站 |

##### 14.2.2 相对路径

相对路径在发送请求时，需要与当前页面 URL 路径进行 **计算** ，得到完整 URL 后，再发送请求，学习阶段用的较多

例如当前网页 url 为 http://www.xxx.com/aaa/h5.html

| 形式               | 最终的 URL                         |
| ------------------ | ---------------------------------- |
| ./css/app.css      | http://www.xxx.com/aaa/css/app.css |
| js/app.js          | http://www.xxx.com/aaa/js/app.js   |
| ../img/logo.png    | http://www.xxx.com/img/logo.png    |
| ../../mp4/show.mp4 | http://www.xxx.com/mp4/show.mp4    |

##### 14.2.3 网页中使用 URL 的场景小结

包括但不限于如下场景：

- a 标签 
- hreflink 标签 
- hrefscript 标签
- srcimg 标签 src
- video audio 标签
- srcform 中的 action
- AJAX 请求中的 URL

#### 14.3 设置资源类型（mime类型）

媒体类型（通常称为 Multipurpose Internet Mail Extensions 或 MIME 类型 ）是一种标准，用来表示文档、文件或字节流的性质和格式。

mime 类型结构：` [type]/[subType]`
例如： `text/html` 、`text/css`、` image/jpeg`、` image/png`、`application/json`

**HTTP 服务可以设置响应头` Content-Type `来表明响应体的 MIME 类型**，浏览器会根据该类型决定如何处理资源
下面是常见文件对应的 mime 类型:

| 类型 | Content-Type         |
| ---- | -------------------- |
| html | `'text/html'`        |
| css  | `'text/css'`         |
| js   | `'text/javascript'`  |
| png  | `'image/png'`        |
| jpg  | `'image/jpeg'`       |
| gif  | `'image/gif'`        |
| mp4  | `'mp4/video/mp4'`    |
| mp3  | `'mp3/audio/mpeg'`   |
| json | `'application/json'` |
| xml  | `'application/xml'`  |

> 对于未知的资源类型，可以选择 `application/octet-stream `类型，浏览器在遇到该类型的响应时，会对响应体内容进行独立存储，也就是我们常见的 **下载** 效果  

```js
require('http').createServer((request,response)=>{
    //获取请求的方法已经路径
    let {url,method} = request;
    //判断请求方式以及请求路径
    if(method == "GET" && url == "/index.html"){
        //需要响应文件中的内容
        let data = require('fs').readFileSync(__dirname + '/index.html');
        response.end(data);
    }else if(method == "GET" && url == "/css/app.css"){
        //需要响应文件中的内容
        let data = require('fs').readFileSync(__dirname + '/public/css/app.css');
        response.end(data);
    }else if(method == "GET" && url == "/js/app.js"){
        //需要响应文件中的内容
        let data = require('fs').readFileSync(__dirname + '/public/js/app.js');
        response.end(data);
    } else {
        //404响应
        response.statusCode = 404;
        response.end("<h1>404 Not Found</h1>");
    }
}).listen(9000,()=>{
	console.log('9000端口正在启动中....');
})
```

很明显上面的代码，当只要有一个请求路径就需要进行判断，显然这种方式不够完美，那么我们需要封装  

```js
require('http').createServer((request,response)=>{
    //获取请求的方法已经路径
    let {url,method} = request;
    //文件夹路径
    let rootDir = __dirname + '/public';
    //拼接文件路径
    let filePath = rootDir + url;
    //读取文件内容
    fs.readFile(filePath,(err,data)=>{
        //判断
        if(err){
            //如果出现错误，响应404状态码
            response.statusCode = 404;
            response.end('<h1>404 Not Found</h1>');
        }else{
            //响应文件内容
            response.end(data);
        }
    })
}).listen(9000,()=>{
	console.log('9000端口正在启动中....');
})
```

### 15 GET 和 POST 请求

####  15.1 GET 和 POST 请求场景小结

GET 请求的情况：

- 在地址栏直接输入 url 访问
- 点击 a 链接
- link 标签引入 css
- script 标签引入 js
- img 标签引入图片
- form 标签中的 method 为 get （不区分大小写）
- ajax 中的 get 请求

POST 请求的情况：

- form 标签中的 method 为 post（不区分大小写）
- AJAX 的 post 请求

#### 15.2 GET和POST请求的区别

GET 和 POST 是 HTTP 协议请求的两种方式。

- GET 主要用来获取数据，POST 主要用来提交数据
- GET 带参数请求是将参数缀到 URL 之后，在地址栏中输入 url 访问网站就是 GET 请求， POST 带参数请求是将参数放到请求体中
- POST 请求**相对 GET 安全**一些，因为在浏览器中参数会暴露在地址栏
- GET 请求大小有限制，一般为 2K，而 POST 请求则没有大小限制  

### 16. Server 案例

静态资源请求，错误处理，防止中文乱码

![image-20241020180438191](./Nodejs_NoteImg/image-20241020180438191.png)

`server.js`:

```js
/**
 * 创建一个HTTP服务，端口为9000，满足如下需求
 * GET  /index.html      响应  page/index.html 的文件内容
 * GET  /css/app.css     响应  page/css/app.css 的文件内容
 * GET  /images/logo.png 响应  page/images/1ogo.png 的文件内容
 */

// 导入 http 模块
const http = require('http');
const fs = require('fs');
const path = require('path');

// 声明一个变量
let mimes = {  
    html: 'text/html',  
    css: 'text/css',  
    js: 'application/javascript',  
    json: 'application/json',  
    xml: 'application/xml',  
    png: 'image/png',  
    jpg: 'image/jpeg',  
    gif: 'image/gif',  
    pdf: 'application/pdf',  
    zip: 'application/zip'  
};  

// 创建服务对象
const server = http.createServer((request, response) => {
    if (request.method !== "GET") {
        response.statusCode = 405;
        response.end('<h1>405 Method Not Allowed</h1>')
        return;
    }
    // 获取请求URL的路径
    
    let {pathname} = new URL(request.url, 'http://192.168.0.1');

    // 优化
    let root = __dirname + '/page' // 网站根目录
    // 拼接文件路径
    let filePath = root + pathname;
    // 读取文件
    // 读取文件内容 fs 这里异步方式
    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.setHeader('content-type','text/html;charset=utf-8'); // 防止中文乱码
            switch (err.code) {
                case "ENOENT" : // 找不到
                    response.statusCode = 404;
                    response.end('<h1>404 Not Found</h1>')
                case "EPERM" : // 权限不足
                    response.statusCode = 403;
                    response.end('<h1>403 Forbidden</h1>')
                default :
                    response.statusCode = 500;
                    response.end("<h1>Internal Server Error</h1>");
            }
            return;
        }
        // 获取文件的后缀名
        let ext = path.extname(filePath).slice(1); // 截掉.只保留后缀
        // 获取对应的类型
        let type = mimes[ext];
        if (type) {
            // 匹配到了
            // response.setHeader('content-type', type);
            if (ext === 'html') {
                response.setHeader('content-type', type + ";charset=utf-8"); // // 防止中文乱码 响应头中的字符集优先级高于html中meta标签设置的字符集
            } else {
                response.setHeader('content-type', type);
            }
        } else {
            // 没有匹配到
            // 对于未知的资源类型，可以选择 `application/octet-stream `类型，浏览器在遇到该类型的响应时，会对响应体内容进行独立存储，也就是我们常见的 **下载** 效果  
            response.setHeader('content-type', 'application/octet-stream')
        }
        
        // 响应文件内容
        response.end(data)
    })
})

server.listen(9000, () => {
    console.log('服务已经启动');
})
```

