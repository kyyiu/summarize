var Queue = require('./队列.js')

// 字典
function Dictionary(){
	this.items = {}
	Dictionary.prototype.set = function(key,value){
		this.items[key] = value
	}
	Dictionary.prototype.has = function(key){
		return this.items.hasOwnProperty(key)
	}
	Dictionary.prototype.get = function(key){
		return this.has(key) ? this.items[key] : undefined
	}
	Dictionary.prototype.remove = function(key){
		if(!this.has(key)) return false
		delete this.items[key]
		return true
	}
	Dictionary.prototype.keys = function(){
		return Object.keys(this.items)
	}
	
	Dictionary.prototype.values = function(){
		return Object.values(this.items)
	}
	Dictionary.prototype.size = function(){
		return this.keys().length
	}
	Dictionary.prototype.clear = function(){
		this.items = {}
	}
	
	
}


// 图实现
function Graph(){
	this.vertexes = []//顶点
	this.edges = new Dictionary()
	
	Graph.prototype.addVertex = function(v){
		this.vertexes.push(v)
		this.edges.set(v,[])
	}
	
	Graph.prototype.addEdge = function(v1,v2){
		this.edges.get(v1).push(v2)
		this.edges.get(v2).push(v1)
	}
	
	Graph.prototype.toString = function(){
		var rs = ''
		for(var i = 0;i<this.vertexes.length;i++){
			rs += this.vertexes[i]+'->'
			var vE = this.edges.get(this.vertexes[i])
			for(var j = 0;j<vE.length;j++){
				rs += vE[j]+ ' '
			}
			rs +=  '\n'
		}
		return rs
	} 
	
	Graph.prototype.initializeColor = function(){
		var colors = []
		for(var i= 0;i<this.vertexes.length;i++){
			colors[this.vertexes[i]] = 'white'
		}
		console.log(colors)
		return colors
	}
	
	//initV顶点,取出顶点相连的点,传入队列,重复,灰色是访问过,但是名下的其他节点为访问,黑色全部访问过
	Graph.prototype.bfs = function(initV,handler){
		var colors = this.initializeColor()
		var queue = new Queue()
		//将顶点加入到队列中
		queue.enqueue(initV)
		//循环队列取出元素
		while(!queue.isEmpty()){
			//取出一个元素
			var v = queue.dequeue()
			//获取和顶点相连的另外顶点
			var vList = this.edges.get(v)
			//将v的颜色设置为灰色
			colors[v] = 'gray'
			//遍历所有的顶点,如果没有访问过,加入队列
			for(var i=0;i<vList.length;i++){
				var e = vList[i]
				if(colors[e] == 'white'){
					colors[e] = 'gray'
					queue.enqueue(e)
				}
			}
			//访问顶点
			handler(v)
			//将顶点设置为黑色
			colors[v] = 'black'
			console.log(colors)
		}
	}
	
	
	Graph.prototype.dfs = function(initV,handler){
		var colors = this.initializeColor()
		this.dfsVisit(initV,colors,handler)
	}
	
	Graph.prototype.dfsVisit = function (v,colors,handler){
		colors[v] = 'gray'
		handler(v)
		var vList = this.edges.get(v)
		
		for(var i=0;i<vList.length;i++){
			var e=vList[i]
			
			if(colors[e] == 'white'){//全部探索完成,自动结束递归,开始回滚,从最底层开始往最初所给顶点变成black
				this.dfsVisit(e,colors,handler)
				
			}
		}
		colors[v] = 'black'
		console.log(colors)
	}
}



var g = new Graph()
g.addVertex('A')
g.addVertex('B')
g.addVertex('C')
g.addVertex('D')
g.addVertex('E')
g.addVertex('F')
g.addVertex('G')
g.addVertex('H')
g.addVertex('I')

g.addEdge('A','B')
g.addEdge('A','C')
g.addEdge('A','D')
g.addEdge('C','D')
g.addEdge('C','G')
g.addEdge('D','G')
g.addEdge('D','H')
g.addEdge('B','E')
g.addEdge('B','F')
g.addEdge('E','I')

var rst = ''
// g.bfs(g.vertexes[8],function(v){
// 	rst += v + ' '
// })

g.dfs(g.vertexes[0],function(v){
	rst += v + ' '
})
console.log(rst)

// 宽度优先遍历
// 1.队列实现
// 2.从源节点开始依次按照宽度进入队列，然后弹出
// 3.每次弹出一个点，把该点所有没有进入过队列的邻接点放入队列
// 4.直到队列变空
bfc(node) {
	if(node===null) {
		return
	}
	queue = []
	set = new Set()
	queue.push(node)
	set.add(node)
	while(!queue.length<1) {
		cur = queue.shift()
		console.log(cur.val)
	}
	for(const next of cur.nexts) {
		if(!set.has(next)) {
			set.add(next)
			queue.push((next))
		}
	}
}

// 广度优先遍历
// 1.栈实现
// 2.源节点开始把节点按照深度放入，然后弹出
// 3.每次弹出一个，把该节点下一个没有进入过栈的邻接点放入栈
// 4.直到栈变空

dfc(node) {
	if(node===null) {
		return
	}
	stack = []
	set = []
	stack.push(node)
	set.add(node)
	console.log(node.val)
	while(!stack.length<1) {
		cur = stack.pop()
		for(const next of cur.nexts) {
			// 先一条路走到底
			if(!set.has(next)) {
				stack.push(cur)
				stack.push(next)
				set.add(next)
				console.log(next.val)
				break
			}
		}
	}
}

// 图的存储方式
// 邻接表
// 邻接矩阵

// 好用的图结构如下， 以后的各种图可以通过某种方式转换为下面的图结构
class Edge(weight, fromWhere , to) {
	this.weight = weight
	this.fromWhere = fromWhere
	this.to = to
}

class Node(val) {
	this.val = val
	this.In = 0
	this.out = 0
	this.nexts = []
	this.edges = []
}

class Graph() {
	this.nodes = new Map()
	this.edges = new Set()
}

// 拓扑排序
// 有向图，且无环，入度为0的节点
sortTopo(graph) {
	// key: 某一个node
	// value：剩下的入度
	inMap = new Map()
	// 入度为0的才能进入队列
	queue = []
	for(const node of graph.nodes.v) {
		inmap(node, node.in)
		if(node.in === 0 ) {
			queue.push(node)
		}
	}
	
	// 拓扑排序的结果，依次加入result
	result = []
	while(!queue.length<1) {
		cur = queue.shift()
		result.push(cur)
		for(const next of cur.nexts) {
			inMap(next, inMap.get(next)-1)
			if(inMap.get(next)===0) {
				queue.push(next)
			}
		}
	}
	return result
}