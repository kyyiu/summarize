function PriorityQueue(){
	function QueueElement(element,priority){
		this.element = element
		this.priority = priority
	}
	
	this.items = []
	
	PriorityQueue.prototype.enqueue = function (element,priority){
		var qu = new QueueElement(element,priority)
		if(this.items.length==0){
			this.items.push(qu)
		}else{
			var added = false
			for(var i=0;i<this.items.length;i++){
				//priority越小,越优先
				if(qu.priority<this.items[i].priority){
					// splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
					// arrayObject.splice(index,howmany,item1,.....,itemX)
					// index	必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
					// howmany	必需。要删除的项目数量。如果设置为 0，则不会删除项目。
					// item1, ..., itemX	可选。向数组添加的新项目。
					this.items.splice(i,0,qu)
					added = true
					break
				}
			}
			if(!added){
				this.items.push(qu)
			}
		}
	}
	
	
	//删除前端元素
	PriorityQueue.prototype.dequeue = function(){
		return this.items.shift()
	}
	//查看前端元素
	PriorityQueue.prototype.front = function(){
		return this.items[0]
	}
	//查看队列是否为空
	PriorityQueue.prototype.isEmpty = function(){
		return this.items.length == 0
	}
	//查看队列个数
	PriorityQueue.prototype.size = function(){
		return this.items.length
	}
	//tostring方法
	PriorityQueue.prototype.toString = function (){
		var resultString = ''
		for (var i = 0;i< this.items.length;i++){
			resultString += this.items[i].element + ' '
		}
		return resultString
	}
}

var pr = new PriorityQueue()


pr.enqueue('a',100)
pr.enqueue('b',30)
pr.enqueue('c',100)
pr.enqueue('d',110)

console.log(pr.toString())