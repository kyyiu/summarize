function Stack(){
	//栈中的属性
	this.items = []
	
	//栈相关操作
	//将元素压入
	// this.push = function(){} 这种方式相当于给某一个对象的实例添加了一个方法,下面的相当于给整个类添加这个方法,所以推荐下面节省空间
	Stack.prototype.push = function(element){
		this.items.push(element)
	}
	//从栈中取出元素
	Stack.prototype.pop = function(){
		return this.items.pop()
	}
	//查看栈顶元素
	Stack.prototype.peek = function(){
		return this.items[this.items.length-1]
	}
	//判断是否为空
	Stack.prototype.isEmpty = function(){
		return this.items.length == 0
	}
	//获取元素个数
	Stack.prototype.size = function(){
		return this.items.length
	}
	//tostring方法
	Stack.prototype.toString = function(){
		var resultString = ''
		for(var i = 0;i < this.items.length; i++){
			resultString += this.items[i] + ' '
		}
		return resultString
	}
}

//栈的使用
var s = new Stack()

s.push('123')
s.push('456')

console.log(s.toString())

console.log(s.pop())

console.log(s.peek())

console.log(s.isEmpty())

console.log(s.size())

//十进制转二进制

function dec2bin(num){
	var stack = new Stack()
	
	while(num > 0){
		stack.push(num % 2)
		num = Math.floor(num / 2)
	}
	var binString = ''
	while(!stack.isEmpty()){
		binString += stack.pop()
	}
	return binString
}

console.log(dec2bin(100))