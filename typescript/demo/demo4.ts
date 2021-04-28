// // 类是对象具体事物的一个抽象，对象是类的具体表现
// // class Woman{
// // 	public sex:string //公共属性
// // 	protected name:string //保护属性,只能在类及其子类访问
// // 	private age:number //私有属性在类中访问
// // 	public constructor(sex:string,name:string,age:number){
// // 		this.sex = sex
// // 		this.name = name
// // 		this.age = age
// // 	}
// // 	public sayHello(){
// // 		console.log('hello')
// // 	}
// // 	protected sayLove(){
// // 		console.log('love')
// // 	}
// // }

// // var god:Woman = new Woman('女','t0',15)

// // // 只读属性 readonly
// // class Man{
// // 	public readonly sex:string='nan'
// // }
// // var man:Man = new Man()
// // // man.sex = 'nv' 错误

// // // 继承
// // class father{
// // 	public name:string
// // 	public age:number
// // 	public skill:string
// // 	constructor(name:string,age:number,skill:string){
// // 		this.name = name
// // 		this.age = age
// // 		this.skill = skill
// // 	}
// // 	public interest(){
// // 		console.log('father')
// // 	}
// // }

// // class son extends father{
// // 	public outLook:string = 'handsome'
// // 	public earn(){
// // 		console.log('moneny')
// // 	}
// // 	public interest(){
// // 		super.interest()
// // 		console.log('sonson')
// // 	}
// // }

// // var son = new Son('son',1,'game')

// // 接口编程
// interface Husband{
// 	sex:string
// 	interest:string
// }

// // 使用接口实现自定义静态类型
// var mhus:Husband = {sex:'nan',interest:'game'}
// console.log(mhus) // {sex:'nan',interest:'game'}

// const xx : {
// 	name: string,
// 	age: number
// } = {
// 	name: '123',
// 	age: 123
// }

// interface S{
// 	(source:string,subString:string):boolean
// }
// var s:S
// s = function(source:string,subString:string):boolean{
// 	var flag = source.search(subString)
// 	return flag!==-1
// }
// console.log(s('1,2,3','4')) //false

// interface GG{
// 	name: string;
// 	age: number;
// 	sex ?: number;
// 	[propname:string]:any; //键的名称是字符串类型,值是任何类型,比如下面的xx:'zz'
// 	say():string;
// }

// const gz = {
// 	name = '123'
// 	age = 11
// 	xx: 'zz'
// 	say(){
// 		return '115'
// 	}
// }

// class MM implements GG { //接口限制类
// 	name = '123'
// 	age = 11
// 	xx: 'zz'
// 	say(){
// 		return '115'
// 	}
// }

// // 接口继承
// interface TT extends GG{
	
// }


// // 命名空间
// namespace shuaiGe{
// 	export class Dehua{
// 		public name:string = '刘德华'
// 		talk(){
// 			console.log('1')
// 		}
// 	}
// }
// namespace bajie{
// 	export class Dehua{
// 		public name:string = '马德华'
// 		talk(){
// 			console.log('2')
// 		}
// 	}
// }
// var d1:shuaiGe.Dehua = new shuaiGe.Dehua()
// var d2:bajie.Dehua = new bajie.Dehua()
// d1.talk() //1
// d2.talk() //2