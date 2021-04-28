// fs模块
const fs = require('fs')
// fs.stat 检测是文件还是目录
fs.stat('./package.json',(err,data)=>{
	if(err){
		console.log(err)
		return
	} 
	console.log('是文件',data.isFile()) //true
	console.log('是目录',data.isDirectory()) //false
})

// fs.mkdir 创建目录
// (path,mode,callback) 将创建的目录路径,目录权限默认777,传递异常参数err
fs.mkdir('./css',(err)=>{
	// 创建失败
	if(err){
		console.log(err)
		return
	}
	console.log('创建成功')
})

// fs.writeFile 创建写入文件
fs.writeFile('./html/index.html','你好node',(err)=>{
	if(err){
		console.log(err)
		return
	}
	console.log('创建写入文件成功')
})


// fs.appendFile 追加文件
// fs.writeFile会重写,appendFile会追加写
fs.appendFile('./css/base.css','body{color:red}\n',(err)=>{
	if(err){
		console.log(err)
		return
	}
	console.log('创建写入文件成功')
})

// fs.readFile 读取文件
fs.readFile('./html/index.html',(err,data)=>{
	if(err){
		console.log(err)
		return
	}
	console.log(data)
	console.log(data.toString()) //把buffer转换成string类型
})
// fs.readdir读取目录
fs.readdir('./html',(err,data)=>{
	if(err){
		console.log(err)
		return
	}
	console.log(data)
})

// fs.rename 重命名 1表示重命名,2移动文件
fs.rename('./css/aaa.css','./css/index.css',(err)=>{
	if(err){
		console.log(err)
		return
	}
	console.log('重命名成功')
})
fs.rename('./css/index.css','./html/index.css',(err)=>{
	if(err){
		console.log(err)
		return
	}
	console.log('移动成功')
})

// fs.unlink删除文件
fs.unlink('./aa/index.html',(err)=>{})

// fs.rmdir 删除目录
fs.rmdir('./aa',(err)=>{
	if(err){
		console.log(err)
		return
	}
	console.log('删除目录成功')
})

