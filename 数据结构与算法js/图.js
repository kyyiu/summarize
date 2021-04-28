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



