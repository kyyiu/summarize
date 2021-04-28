// 以流的方式读取文件
const fs = require('fs')

// // 创建读取流
// let readStream = fs.createReadStream('./data/data.txt')

// let c = 0
// let s = ''
// // 监听读取状态
// readStream.on('data',(data)=>{
// 	s+=data
// 	c++
// })
// // 监听读取完毕
// readStream.on('end',()=>{
// 	console.log(s,'A')
// 	console.log(c,'B')
// })
// readStream.on('error',(err)=> console.log(err))

以流的方式写入
let s = ''
for (let i =0;i<500;i++){
	s+='我是大数据\n'
}
let writeStream = fs.createWriteStream('./data/data2.txt')
writeStream.write(s)
// 标记写入完成/标记文件末尾,不标记无法监听finish
writeStream.end()
writeStream.on('finish',()=>{console.log('写入完成')})

// 管道流,主要实现大文件的复制
// 创建一个可读流
let readStream = fs.createReadStream('./1.jpg') //也可以复制zip等压缩文件
// 创建一个可写流
let writeStream = fs.createWriteStream('./data/2.jpg')
// 管道读写操作
readStream.pipe(writeStream)