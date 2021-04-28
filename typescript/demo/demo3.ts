// 引用类型

// array
// var arr1:number[]
// var arr2:Array<boolean>

// 字面量赋值法
var a1:number[] = []
var a2:number[] = [1,2,3,4,5]

var a3:Array<string> = ['1','2','3']
var a4:Array<boolean> = [true,false,false]

// 声明可以存放多种类型的数组
const arr:(number | string)[] = [1,'ss',1]

const arrx : {name:string,age:number} [] = [
	{name:'1',age:1},
	{name:'2',age:2}	
]
// 上面太麻烦,使用 type alias类型别名 或者类
type LL = { name:string,age:number}
const arrx1: LL[]=[
	{name:'1',age:1},
	{name:'2',age:2}	
]
class L2 {
	name:string;
	age:number;
}
const arrx1: L2[]=[
	{name:'1',age:1},
	{name:'2',age:2}	
]
// 构造函数赋值法

var b1:number[] = new Array()
var b2:number[] = new Array(1,2,3,4,5)

var b3:Array<string> = new Array('1','2','3')
var b4:Array<boolean> = new Array(true,false,false)

// 基本类型字符串（单引号），引用类型字符串（双引号）
var str:string = 'str' //str
var str1:String = new String('str1') //[String: 'str1']
// 方法
// 查找字符串 indexOf
var sss:string = '1234567890'
var sss1:string = '5'
console.log(sss.indexOf(sss1))
// subString(开始位置，【结束位置】)


// 日期类型
// 传整数
var d:Date = new Date(1000) // 1970-01-01 00 00 01
// 传字符串
var d1:Date = new Date('2020/11/11 00:00:00')
var d2:Date = new Date('2020-11-11 00:00:00')
var d3:Date = new Date('2020-11-11T00:00:00')
// var d4:Date = new Date(year,month,day,hours,m,s,ms)


// 正则RegExp
// 构造函数声明
var reg1:RegExp = new RegExp('abcdefg') //  /abcdefg/
var reg2:RegExp = new RegExp('abcdefg','hi') //  /abcdefg/hi

// 字面量声明
var reg3:RegExp = /abcdefg/
var reg4:RegExp = /abcdefg/hi

// test(string) exec(string)
var r1:RegExp = /abc/d
var match:string = 'ab'
var rs:boolean = r1.test(match) //如果r1中有match返回true