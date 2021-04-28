//node中向外暴露成员的形式
//moudules.exports = {}

//在es6中 夜通过规范的形式,规定了es6中如何导入和导出模块
//es6中导入模块,使用import 模块名称 from 模块标识符     import '表示路径'
//在es6中使用export default 和export向外暴露成员:

var info ={
	name: 'z',
	age: 2
}
export default info
//在node中 使用 var 名称 = require('模块标识符')
//moudules.exports 和exports 暴露成员

//export default暴露的成员,可以使用任意变量来接收
//在一个模块中 ,export default 只允许暴露一次
//可以同时使用 export default 和 export

export var star = 'star'
export var ccc = 'ccc'
//使用export向外暴露的成员,只能使用花括号形式接收,这种形式叫做按需导出