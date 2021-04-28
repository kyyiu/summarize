// 数据类型
var age:number = 18
var height:number = 180.5
console.log(age,height)

var str:string = 'str'
console.log(str)

var b:boolean = true
var c:boolean = false

// enum类型 枚举
enum REN{nan,nv,y}
console.log(REN.nan) // 打印的是下标
enum RN{nan='m',nv='w',y='x'}
console.log(RN.nan)// 打印的是值

enum Status{
	M = 1,
	S,
	D
}

function getServer(status:any){
	if(status === Status.M){
		return "M"
	}else if(status === Status.S){
		return 'S'
	}else if(status === Status.D){
		return 'D'
	}
}
// 可以反查,也可以改变状态数,如果没有M=1默认从0开始
console.log(Status.M,Status.S,Status.D,Status[1])//1,2,3,M

//any类型 声明之后类型可以随意转换
var t:any = 100
t = 'str'
t = true

const f : ()=>string = ()=>{return '1'} //代表定义的是一个函数并且返回一个字符串


// type annotation 类型注解 如果ts无法分析变量类型，就需要注解
// type inference 类型推断 如果ts能主动分析变量类型，就不需要做什么了

// never 函数永远执行不完的返回类型
function forr():never{
	while(1){}
	console.log('hello')
}

// 为对象参数定义类型
// function a({one:number,two:number}) 错误写法
function a({one,two}:{one:number,two:number}){return one+two}
const total = a({one:1,two:2})