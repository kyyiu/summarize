// 判断服务器上面有没有upload目录,如果没有创建,如果有不操作
const fs = require('fs')
let path = './upload'

fs.stat(path,(err,data)=>{
	if(err){
		mkdir(path)
		return
	}
	if(data.isDirectory()){
		console.log('upload存在')
	}else{
		// 首先删除文件,再去执行创建目录
		fs.unlink(path,(err)=>{
			if(!err){
				mkdir(path)
			}else{
				console.log('去检测参数')
			}
		})
		
	}
})

function mkdir(dir){
	fs.mkdir(dir,(err)=>{
		if(err){
			console.log(err)
			return
		}
	})
}