class Person {
	public name:string;
	constructor(name:string){
		this.name = name
	}
}
// 可以简化成
class P{
	constructor(public name:string){}
}
// 继承
class P2 extends Person{
	constructor (public age:number){
		super('555')//子类调用构造函数必须也调用父类的构造函数,子类没找到name会向原型链上查找,所以要调用super向父类传参
	}
}

class XX{
	constructor(private _age:number){
		
	}
	get age(){
		return this._age-5
	}
	set age(age:number){
		this._age = age+5
		
	}
	static say(){ //静态的作用是把不变的东西当常量直接使用而不再new新对象
		return 'hhh'
	}
}

const a = new XX(20)
console.log(a.age) //15
a.age = 15
console.log(a.age) //20
console.log(XX.say())

// 抽象类
abstract class HH{
	abstract skill() //抽象类的抽象方法,子类必须实现
}
class H1 extends HH{
	skill(){
		console.log('h1')
	}
}
class H2 extends HH{
	skill(){
		console.log('h2')
	}
}