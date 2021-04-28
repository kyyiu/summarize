//在webpack-study目录下使用命令行
//npm init -y 创建 package.json
// 我们每次，去npm install xxx会把内容记录到package.json文件中，下载的包都会发生变化，
// 为了系统的稳定性考虑，每次执行完npm install之后会对应生成package-lock文件，
// 该文件记录了上一次安装的具体的版本号。

// 根据官方文档，package-lock.json 是生成的系统当前安装的库的具体来源和版本号，锁定版本。

// 当你执行npm install的时候， node会先从package.json文件中读取所有dependencies信息，
// 然后根据dependencies中的信息与node_modules中的模块进行对比，没有的直接下载，
// node是从package.json文件读取模块名称，从package-lock.json文件中获取版本号，
// 然后进行下载或者更新。

// 当package.json与package-lock.json都不存在，执行"npm install"时，
// node会重新生成package-lock.json文件，
// 然后把node_modules中的模块信息全部记入package-lock.json文件，但不会生成package.json文件。
// 但是，你可以通过"npm init --yes"来生成package.json文件

//npm install jquery -s 安装 jquery
//项目的js入口文件
//1导入jquery
//import xxx from xxx是es6中导入模块的方式

//ES6的代码太高级了,浏览器解析不了
// web4要安装 cli
//webpack4 用 webpack .\src\main.js -o .\dist\bundle.js解析
//webpack能够处理js文件的互相依赖关系
//能够处理js的兼容问题,把浏览器不能识别的高级的语法变成弟级的浏览器能正常识别的语法,命令格式,webpack 要打包的文件的路径 打包好后输出的文件路径
//wbpack4正确命令 npx webpack ./demo.js -o demo.bundle.js --mode development
import $ from '../node_modules/jquery'
import './css/index.css'
//webpack默认只能打包处理JS类型的文件,无法处理其他的非js类型的文件
//如果要处理需要第三方loader加载器
//npm i style-loader css-loader -D
//webpack.config.js这个里面新增配置节点module,是一个对象,有一个rules属性是个数组,存放第三方匹配和处理规则



$(  function(){
	$('li:odd').css('backgroundColor','green')
	$('li:even').css('backgroundColor',function(){
		return '#'+'ccc'
	})
})


// 使用webpack-dev-server 这个工具实现自动打包编译功能
//1 npm i webpack-dev-server -D 把这个工具安装到项目的本地开发依赖
//或者全局安装工具webpack-dev-server:npm i -g webpack-dev-server(更方便)
//用法和webpack完全一样类似 node和nodemon
//

class Person{
	static info = {name:'z'}
}
console.log(Person.info)

//在webpack中默认只能处理一部分es6新语法,一些更高级的需要
//通过BAbel,可以帮助我们把高级语法转换为低级语法
//1 npm i babel-core babel-loader babel-plugin-transform-runtime -D
//npm i babel-preset-env babel-preset-stage-0 -D
//{test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}
//配置规则是必须把node_modules目录通过exclude选项排除掉
//原因:如果不排除 则会把其中所有的第三方 js文件都打包编译,即使这样完成后夜无法正常运行
//项目根目录中新健.babelrc 的babel配置文件,者配置文件属于json格式,json不能写注释,字符串必须双引号
//.babelrc写如下配置
//{
// 	"preset": ["env","stage-0"],
// 	"plugin": ["Transform-runtime"]
// }