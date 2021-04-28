function LinkedList(){
	function Node(data){
		this.data = data
		this.next = null
	}
	
	this.head = null
	this.length = 0
	
	
	LinkedList.prototype.append = function(data){
		if(this.length == 0){
			var newNode = new Node(data)
			this.head = newNode
		}else{
			var newNode = new Node(data)
			
			var current = this.head
			while(current.next){
				current = current.next
			}
			current.next = newNode
		}
		this.length += 1
	}
	
	
	LinkedList.prototype.toString = function(){
		var current = this.head
		var ls = ''
		while(current){
			ls += current.data + ' '
			current = current.next
		}
		
		return ls
	}
	
	LinkedList.prototype.insert = function(position,data){
		if(position < 0 || position > this.length) return false
		
		var newNode = new Node(data)
		
		if(position == 0){
			//原本head指向的是第一个节点,把新节点的next接在原来第一个节点上
			newNode.next = this.head
			this.head = newNode
		}else{
			var index = 0
			//current为目标节点位置,让新节点的next指向它
			//previous为目标位置前一个节点,让这个节点的next指向新节点
			//同时也包含了插入到最后的位置
			var current = this.head
			var previous = null
			while(index++ < position){
				previous = current
				current = current.next
			}
			newNode.next = current
			previous.next = newNode
		}
		this.length += 1
		return true
	}
	
	
	LinkedList.prototype.get = function(position){
		if(position < 0 || position >= this.length) return null
		var  current = this.head
		var index = 0
		while(index++ < position){
			current = current.next
		}
		return current.data
	}
	
	LinkedList.prototype.indexOf = function(data){
		var  current = this.head
		var index = 0
		while(current){
			if(current.data == data) return index
			current = current.next 
			index++
		}
		return -1
	}
	
	LinkedList.prototype.updata = function(position,newData){
		position = position-1
		if(position < 0 || position > this.length-1) return false
		var current = this.head
		var index = 0
		while(index++ < position){
			current = current.next
		}
		current.data = newData
		return true
	}
	
	
	LinkedList.prototype.removeAt = function (position){
		position = position-1
		if(position < 0 || position > this.length-1 ) return false
		var current = this.head 
		if(position == 0){
			this.head = this.head.next
		}else{
			var index = 0
			var previous = null
			while(index++ < position){
				previous = current
				current = current.next
			}
			previous.next = current.next
		}
		this.length -=1
		return current.data
	}
	
	
	LinkedList.prototype.remove = function (data){
		var position = this.indexOf(data)+1
		return this.removeAt(position)
	}
	
	LinkedList.prototype.isEmpty = function (){
		return this.length == 0
	}
	
	LinkedList.prototype.size = function(){
		return this.length
	}
}



var ll = new LinkedList()

ll.append('bb')
ll.append('a')
ll.append('ccc')
ll.append('eeee')
console.log(ll.toString())
console.log(ll.get(2))
console.log(ll.indexOf('a'))
ll.updata(1,'bbb')
console.log(ll.toString())
ll.removeAt(1)
console.log(ll.toString())
console.log(ll.remove('ccc'))