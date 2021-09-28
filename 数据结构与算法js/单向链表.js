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


// 快慢指针迭代
// while(!n.next === null && !n.next.next === null)

// 如果要把一个连表分成大于，等于，小于，某个数的区域
// 用6个变量，分别保存每个区域的首尾，再判断边界进行链接即可
// if (sT !== null) {
// 	sT.next = eH
// 	eT = eT === null ? sT : eT
// }

// if (eT !== null) {
// 	eT.next = mH
// }

// return sH !== null ? sH : (eH !== null ? eH : mH)

// 求环第一个入口的题型
// 1,快慢指针,找到第一次相遇的点,如果快指针到null则无环
// 2,快指针回到头,快慢指针都只走一步
// 3,直到两个相遇

// 找到链表第一个入环节点，无环则返回null
getLoopNode(head) {
	if (head === null || head.next === null || head.next.next === null) {
		return null
	}
	n1 = head.next
	n2 = head.next.next
	while( n1 !== n2) {
		if(n2.next === null || n2.next.next === null) {
			return null
		}
		n2 = n2.next.next
		n1 = n1.next
	}
	n2 = head
	while(n1 !== n2) {
		n1 = n1.next
		n2 = n2.next
	}
	return n1
}

// 主方法
getIntersectNode(head1, head2) {
	if (head1 === null || head2 === null) {
		return null
	}
	loop1 = getLoopNode(head1)
	loop2 = getLoopNode(head2)
	// 两个都无环
	if(loop1 === null && loop2 === null) {
		return noloop(head1, head2)
	}
	
	if (loop1 !==null && loop2 !== null) {
		return bothloop(haed1, loop1, head2, loop2)
	}
	return null
}

// 两个链表都无环，要么没有相交，要么是Y形状
noLoop(head1, head2) {
	if(head1 === null || head2 === null) {
		return null
	}
	c1 = head1
	c2 = head2
	n = 0
	while(c1.next !== null) {
		n++
		c1 = c1.next
	}
	while(c2.next !== null) {
		n--
		c2 = c2.next
	}
	// 末尾的节点如果两个不同，则不相交
	if(c1 !== c2) {
		return null
	}
	c1 = n > 0 ? head1 : head2 // 把长的当c1
	c2 = c1===head1 ? head2 : head1 // 把短的当c2
	n = Math.abs(n)
	// 长的先走差值步
	while(n !== 0) {
		n--
		c1 = c1.next
	}	
	// 两个同时走，直到相交
	while( c1 !== c2) {
		c1 = c1.next
		c2 = c2.next
	}
	return c1
}

// 两个链表有环，返回第一个相交节点
// 有三种情况，第一种，各自有环，第二种，有公共节点入环，第三种，不是从公共节点入环

bothLoop(head1, loop1, head2, loop2) {
	c1 = null
	c2 = null
	// 两个链表的入环节点相同
	if (loop1 === loop2) {
		c1 = head1
		c2 = head2
		n = 0
		while(c1 !== loop1) {
			n++
			c1 = c1.next
		}
		while (c2 !== loop2) {
			n--
			c2 = c2.next
		}
		c1 = n > 0? head1 :head2
		c2 = c1 === head1 ? head2 :head1
		n = Math.abs(n)
		while( n !== 0) {
			n--
			c1 = c1.next
		}
		while( c1 !== c2) {
			c1 = c1.next
			c2 = c2.next
		}
		return c1
	} else {
		// 进环
		c1 = loop1.next
		// 如果绕回c1的入环节点了，则两个不相交
		while(c1 !== loop1) {
			// 如果遇到了c2的入环节点，则两个相交，返回loop1或者loop2都行
			if (c1 === loop2) {
				return loop1
			}
			// 绕环走
			c1 = c1.next
		}
		// 两个不相交
		return null
	}
}