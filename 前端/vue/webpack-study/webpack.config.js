const path = require('path')
//这个配置文件,其实就是一个js文件,通过node中的模块操作,向外暴露了一个配置对象
module.exports = {
	mode: 'development',
	 entry: __dirname+'\\src\\main.js',//path.join(__dirname,'./src/main.js'),//人口,表示要使用webpack打包哪个文件
	output: {
		path: __dirname+'\\dist',//path.join(__dirname,'./dist'),//指定打包好的文件输入的目录
		filename: 'bundle.js'//指定名字
	},
	plugins:[
		//配置插件节点
	],
	module: {
		//用于配置所有第三方模块加载器
		rules:[
			//所有第三方模块的匹配规则
			{test: /\.css$/, use:['style-loader','css-loader']},//配置处理.css文件的第三方loader规则
			{test: /\.(jpg|png|gif|bmp|jpeg)$/,use: 'url-loader'},//处理图片路径,其余参数?limit=1111&name=[hash:8]-[name].[ext]
			{test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}
		]
	}
}

