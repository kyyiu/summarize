// 用树结构来看，简单来说纵向优先遍历
function Node1(val){
	this.left = null
	this.val = val
	this.right = null
}

let root = new Node1(0)

function c(n, deep){
	let t = deep
	if(deep===0){
		return
	}
	n.left = new Node1(t)
	n.right = new Node1(--t)
	c(n.left, deep-1)
	c(n.right, deep-1)
}

c(root, 2)
console.log(root)
function dfs(r){
	if(r){
		console.log(r.val)
		dfs(r.left)
		dfs(r.right)
	}
}

dfs(root)