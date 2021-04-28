// function createPerson(name,age){
// 	var obj = new Object();
// 	obj.name = name;
// 	obj.age = age;
// 	obj.getName = function(){
// 		console.log(this.name)
// 	};
// 	return obj
// }
// var p1 = createPerson('1',11)
// var p2 = createPerson('2',22)
// p1.getName() //1
// p2.getName() //2
// // 这个方式虽然解决了创建多个相似对象的问题但是没有解决对象识别的问题

// function Person(name,age){
// 	this.name = name;
// 	this.age = age;
// 	this.getName = function(){
// 		console.log(this.name)
// 	};
// }
// var p1 = new Person('1',11)
// var p2 = new Person('2',22)
// // new 的方式调用构造函数实际上会经历以下4个步骤
// // 1创建一个新对象
// // 2将构造函数的作用域给新对象(使用call或者apply,所以this就指向了这个新对象)
// // 3执行构造函数中的代码(为这个新对象添加属性)
// // 4返回这新对象
// p1.getName() //1
// p2.getName() //2
// console.log(p1 instanceof Person)//true
// // 这个方法的主要问题就是每个方法都要在每个实例上重新创建一遍
// console.log(p1.getName === p2.getName)


// 我们创建的每个函数都有一个prototype(原型)属性,这属性是一个指针,指向一个对象
// 而这对象的用途是包含可以由特定类型的所有实例共享的属性和方法

// function Person(){
// }
// Person.prototype.name = '1';
// Person.prototype.age = 11;
// Person.prototype.getName = function (){
// 	console.log(this.name);
// };
// var p1 = new Person()
// var p2 = new Person()
// p1.getName() //1
// p2.getName() //2
// console.log(p1)
// console.log(p1.getName === p2.getName) //true

// 构造模式定义实例属性,而原型模式定义方法和共享属性

function Person (name,age){
	this.name = name;
	this.age = age;
	this.arr = ['x','y','z']
}
Person.prototype = {
	constructor: Person,
	getName: function(){
		console.log(this.name)
	}
}
var p1 = new Person('1',11)
var p2 = new Person('2',22)
p1.arr.push('bili')
console.log(p1.arr) // ["x", "y", "z", "bili"]
console.log(p2.arr) //["x", "y", "z"]
console.log(p1.arr===p2.arr) //false
console.log(p1.getName===p2.getName) //true