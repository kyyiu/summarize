function DoubelLinkedList(){
	this.head = null
	this.tail = null 
	this.length = 0
	function  Node(data){
		this.pre = null
		this.data = data
		this.next = null
	}
	
	DoubelLinkedList.prototype.append = function(data){
		var newNode = new Node(data)
		if(this.length == 0){
			this.head = newNode
			this.tail = newNode
		}else{
			//把尾巴的数据给 新节点的pre,因为是引用类型所以tail的修改会改变原尾元素
			newNode.pre = this.tail
			//将原尾元素的next指向新节点
			this.tail.next = newNode
			//tail重新指向最后一个元素
			this.tail = newNode
		}
		this.length += 1
	}
	
	
	DoubelLinkedList.prototype.toString = function(){
		return this.backwardString()
	}
	
	DoubelLinkedList.prototype.forwardString = function(){
		var current = this.tail
		var resultString = ''
		while(current){
			resultString += current.data + ' '
			current = current.pre
		}
		return resultString
	}
	//从前往后
	DoubelLinkedList.prototype.backwardString = function(){
		var current = this.head
		var resultString = ''
		while(current){
			resultString += current.data + ' '
			current = current.next
		}
		return resultString
	}
	
	
	DoubelLinkedList.prototype.insert = function(position,data){
		position = position-1
		if(position < 0 || position > this.length-1) return false
		var newNode = new Node(data)
		if(this.length == 0){
			this.head = newNode
			this.tail = newNode
		}else{
			if(position == 0){
				this.head.pre = newNode
				newNode.next = this.head
				this.head = newNode
			}else if(position == this.length-1){
				newNode.pre = this.tail
				this.tail.next = newNode
				this.tail = newNode
			}else{
				var current = this.head
				var index = 0
				while(index++ < position){
					current = current.next
				}
				newNode.next = current
				newNode.pre = current.pre
				current.pre.next = newNode
				current.pre = newNode
			}
		}
		this.length += 1
		return true
	}
	
	DoubelLinkedList.prototype.get = function(position){
		position = position-1
		if(position < 0 || position > this.length-1) return null
		var current = this.head
		var index = 0
		while(index++ < position){
			current = current.next
		}
		return current.data
	}
	
	
	DoubelLinkedList.prototype.indexOf = function(data){
		var current = this.head 
		var index = 0
		while(current){
			if(current.data == data) return index
			current = current.next
			index += 1
		}
		return -1
	}
	
	DoubelLinkedList.prototype.updata = function(position,data){
		position = position-1
		if(position < 0 || position > this.length-1) return false
		var current = this.head
		var index = 0
		while(index++ < position){
			current = current.next
		}
		current.data = data
		return true
	}
	
	DoubelLinkedList.prototype.removeAt = function(position){
		position = position - 1 
		if(position < 0 || position > this.length-1) return false
		
		var current = this.head
		if(this.length == 1){
			this.head = null
			this.tail = null
		}else{
			if(position == 0){
				this.head.next.pre = null
				this.head = this.head.next
			}else if(position == this.length-1){
				current = this.tail
				this.tail.pre.next = null
				this.tail = this.tail.pre
			}else{
				var index = 0
				
				while(index++ < position){
					current = current.next
				}
				current.pre.next = current.next
				current.next.pre = current.pre
			}
		}
		this.length -= 1
		return current.data
	}
	
	DoubelLinkedList.prototype.remove = function (data){
		var index = this.indexOf(data)
		return this.removeAt(index+1)
		
	}
	
	
	DoubelLinkedList.prototype.isEmpty = function(){
		return this.length == 0
	}
	
	DoubelLinkedList.prototype.size = function(){
		return this.length
	}
	
	DoubelLinkedList.prototype.getHead = function(){
		return this.head.data
	}
	
	DoubelLinkedList.prototype.getTail = function(){
		return this.tail.data
	}
}


var Dl = new DoubelLinkedList()

Dl.append('c')
Dl.append('b')
Dl.append('a')

console.log(Dl.backwardString())
console.log(Dl.forwardString())
console.log(Dl.toString())
Dl.insert(2,'d')
console.log(Dl.toString())
console.log(Dl.get(1))
console.log(Dl.indexOf('a'))
Dl.updata(2,'e')
console.log(Dl.toString())
console.log(Dl.removeAt(4))
console.log(Dl.remove('b'))
console.log(Dl.toString())
console.log(Dl.getHead(),'--',Dl.getTail())