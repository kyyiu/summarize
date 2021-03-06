function PriorityQueue(orderBy){
	function QueueElement(element,priority){
		this.element = element
		this.priority = priority
	}
	
	// 堆
	this.items = []
	// 默认小根堆
	this.isBigRoot = orderBy || 0
	
	PriorityQueue.prototype.compareFunc = function(a, b) {
		return this.isBigRoot ? (a - b < 0) : (a - b >= 0)
	}
	
	PriorityQueue.prototype.enqueue = function (element,priority){
		priority = priority || element
		var qu = new QueueElement(element,priority)
		// 堆为空直接
		if(this.items.length==0){
			this.items.push(qu)
		}else{
			var added = false
			for(var i=0;i<this.items.length;i++){
				//priority越小,越优先,小根堆  qu.priority<this.items[i].priority
				// qu.priority>this.items[i].priority 生成大根堆
				if(this.compareFunc(qu.priority, this.items[i].priority)){
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

var pr = new PriorityQueue(1)
for(const ele of [0,7,3,8]) {
  pr.enqueue(ele, ele)	
}

console.log(pr.toString())


// 可修改已经存在的节点的堆
function heap2() {

	function Node(node, weight) {
		this.node = node
		this.weight = weight
	}

	this.nodes = []
	this.nodeIdxMap = new Map()
	this.weightMap = new Map()
	this.len = 0

	heap2.prototype.isEmpty = function() {
		return !this.size 
	}

	// 进来过node
	heap2.prototype.becameNodes = function(node) {
		return this.nodeIdxMap.has(node)

	}

	// 在nodes中有的node
	heap2.prototype.isInHeap = function(node) {
		return this.nodeIdxMap.has(node) && this.nodeIdxMap[node] !== -1
	} 

	heap2.prototype.addOrUpdateOrIgnore = function(node, weight) {
		// 在heap中的node更新
		if(this.isInHeap(node)) {
			this.weightMap.set(node, Math.min(this.weightMap[node], weight))
			insertHeapify(node, this.nodeIdxMap[node])
		}
		// 不在heap中的添加
		if(!this.becameNodes(node)) {
			this.nodes[this.size] = node
			this.nodeIdxMap.set(node, size)
			this.weightMap.set(node, weight)
			insertHeapify(node, size++)
		}
	}
}


// 某个数现在处在index位置，往上继续移动
function heapInsert(arr, index) {
	// 当前的数大于父位置的数，则两者交换位置，index来到父位置，继续
	// 直到index位置的数不再比父位置大，或者来到头位置
	while(arr[index] > arr[Math.floor((index-1)/2)]) {
		swap(arr, index, Math.floor((index-1)/2));
		index = Math.floor((index-1) /2)
	}
}

// 某个数在index位置，能否往下移动
function heapify(arr, index, heapSize) {
	let left = index*2+1 // 左孩子下标
	while(left < heapSize) { // 从index位置出发左下方还有孩子的时候
		// 两个孩子中，谁的值大，把下标给bigger
		// left +1 <heapSize  有右孩子
		// arr[left+1] > arr[left] 右孩子大于左孩子 
		let bigger = left +1 <heapSize && arr[left+1] > arr[left] ? left+1 : left
		// 父亲和孩子之间，谁的值大，把下标给bigger
		bigger = arr[bigger] > arr[index] ? bigger : index
		if (bigger == index) {
			break
		}
		swap(arr, bigger, index)
		index = bigger
		left = index*2+1
	}
}