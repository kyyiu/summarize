// 用树结构来看，简单地说横向优先遍历


function Node(val){
	this.left = null
	this.val = val
	this.right = null
}

let n = new Node(0)

/**
 * @param {Object} node
 * @param {Number} deep
 * 递归思想
 * 1.终结条件
 * 2.是否需要向上级返回数据
 * 3.每次递归的任务
 */ 
function f(node, deep){
	if(deep===0){
		return
	}
	node.left = new Node(deep)
	node.right = new Node(deep)
	f(node.left, deep-1)
	f(node.right, deep-1)
}

// 创建深度为2的树
f(n, 2)



console.log(n)

function bfs(n){
	let t = []
	t.push(n)
	while(t.length){
		let t1 = t.shift()
		console.log(t1.val)
		if(t1.left){
			t.push(t1.left)
		} 
		if(t1.right){
			t.push(t1.right)
		}
	}
}
bfs(n)