function Queue(){
	this.items = []
	
	//将元素加入队列中
	Queue.prototype.enqueue = function(element){
		this.items.push(element)
	}
	//删除前端元素
	Queue.prototype.dequeue = function(){
		return this.items.shift()
	}
	//查看前端元素
	Queue.prototype.front = function(){
		return this.items[0]
	}
	//查看队列是否为空
	Queue.prototype.isEmpty = function(){
		return this.items.length == 0
	}
	//查看队列个数
	Queue.prototype.size = function(){
		return this.items.length
	}
	//tostring方法
	Queue.prototype.toString = function (){
		var resultString = ''
		for (var i = 0;i< this.items.length;i++){
			resultString += this.items[i] + ' '
		}
		return resultString
	}
}
// 将队列暴露出去使用require 或者es6的import进行使用
module.exports = Queue

//  以下是调试用例
// var queue = new Queue()

// queue.enqueue('1')
// queue.enqueue('2')

// queue.dequeue()
// console.log(queue.toString())
// console.log(queue.isEmpty())
// console.log(queue.front())
// console.log(queue.size())

//击鼓传花
//nameList 人 num 数到这个数的人淘汰
// function passGame(nameList,num) {
// 	var qe = new Queue()
	
// 	for(var i = 0; i < nameList.length;i++){
// 		qe.enqueue(nameList[i])
// 	}

	
// 	while(qe.size() > 1){
// 		for(var i= 0;i<num-i;i++){
// 			qe.enqueue(qe.dequeue())
// 		}
// 		qe.dequeue()
// 	}
	
// 	console.log(qe.size())
// 	var endName = qe.front()
// 	console.log(endName)
// 	return nameList.indexOf(endName)
// }

// var l = ['a','b','c']

// console.log(passGame(l,2))