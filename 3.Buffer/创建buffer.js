//创建了一个长度为 10 字节的 Buffer，相当于申请了 10 字节的内存空间，每个字节的值为 0
let buf_1 = Buffer.alloc(10); // 结果为 <Buffer 00 00 00 00 00 00 00 00 00 00>

//创建了一个长度为 10 字节的 Buffer，buffer 中可能存在旧的数据, 可能会影响执行结果，所以叫unsafe
let buf_2 = Buffer.allocUnsafe(10);

//通过字符串创建 Buffer
let buf_3 = Buffer.from('hello');
//通过数组创建 Buffer
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117])
// toString 方法将 Buffer 转为字符串
console.log(buf_4.toString())// iloveyou

//读取
console.log(buf_3[1]);
//修改
buf_3[1] = 97;
//查看字符串结果
console.log(buf_3.toString())

// 溢出
let buf = Buffer.from('hello');
buf[0]=361;//舍弃高位的数字 只保留8位 高位归0 0001 0110 1001 => 0110 1001
console.log(buf)//<Buffer 69 65 6c 6c 6f>

// 中文
let bufch = Buffer.from('你好')// 这里是utf8编码 一个中文占三个字节
console.log(bufch)// <Buffer e4 bd a0 e5 a5 bd>