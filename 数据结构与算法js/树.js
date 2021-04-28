//封装二叉搜索树
function BinarySearchTree(){
	function Node(key){
		this.left = null
		this.key = key
		this.right = null
	}
	this.root = null
	
	BinarySearchTree.prototype.insert = function(key){
		var newNode = new Node(key)
		//判断根节点是否有值
		if(this.root == null){
			this.root = newNode
		}else{
			this.insertNode(this.root,newNode)
		}
	}
	
	BinarySearchTree.prototype.insertNode = function(node,newNode){
		if(newNode.key < node.key){//向左查找
			if(node.left == null){
			   node.left = newNode
			}else{
				this.insertNode(node.left,newNode)
			}
		}else{
			if(node.right == null){
			   node.right = newNode
			}else{
				this.insertNode(node.right,newNode)
			}
		}
	}
	
	
	//先序遍历,1访问根节点2先序遍历其左子数,3先序遍历右子数
	BinarySearchTree.prototype.preOrderTraversal = function(handler){
		this.preOrderTraversalNode(this.root,handler)
	}
	
	BinarySearchTree.prototype.preOrderTraversalNode =function(node,handler){
		
		if(node != null){
			// console.log(node.key)
			//处理经过的节点
			handler(node.key)
			//处理经过节点的子节点
			this.preOrderTraversalNode(node.left,handler)
			this.preOrderTraversalNode(node.right,handler)
		}
	}
	
	
	//中序遍历,中序遍历左子树,访问根节点,中序遍历右子树
	BinarySearchTree.prototype.midOrderTraversal = function(handler){
		this.midOrderTraversalNode(this.root,handler)
	}
	
	BinarySearchTree.prototype.midOrderTraversalNode = function(node,handler){
		if(node != null){
			this.midOrderTraversalNode(node.left,handler)
			handler(node.key)
			this.midOrderTraversalNode(node.right,handler)
		}
	}
	
	//后序遍历,后续遍历其左子树,后序遍历其右子树,访问根节点
	BinarySearchTree.prototype.lastOrderTraversal = function(handler){
		this.lastOrderTraversalNode(this.root,handler)
	}
	
	BinarySearchTree.prototype.lastOrderTraversalNode = function(node,handler){
		if(node != null){
			this.lastOrderTraversalNode(node.left,handler)
			this.lastOrderTraversalNode(node.right,handler)
			handler(node.key)
		}
	}
	
	
	//最值
	
	BinarySearchTree.prototype.max = function(){
		var node = this.root
		var key = null
		while(node != null){
			key = node.key
			node = node.right
		}
		return key
	}
	
	
	BinarySearchTree.prototype.min = function(){
		var node = this.root
		var key = null
		while(node != null){
			key = node.key
			node = node.right
		}
		return key
	}
	
	BinarySearchTree.prototype.search = function(key){
		var  node = this.root
		while(node != null){
			if(key < node.key){
				node = node.left
			}else if(key > node.key){
				node = node.right
			}else{
				return true
			}
		}
		return false
	}
	
	BinarySearchTree.prototype.remove = function(key){
		console.log('hhh')
		//要删除的节点
		var current = this.root
		//存放被删除节点的父节点
		var parent = null
		var isLeftChiild = true
		while(current.key != key){
			parent = current
			if(key < current.key){
				isLeftChiild = true
				current =  current.left
			}else{
				isLeftChiild = false
				current = current.right
			}
			if(current == null) return false
		}
		
		
		if(current.left == null && current.right == null){//删除的节点是叶子节点
			if(current == this.root){
				this.root = null
			}else if(isLeftChiild){
				parent.left = null
			}else{
				parent.right = null
			}
		}else if(current.right == null){//删除节点有一个节点
			if(current == this.root){
				this.root = current.left
			}else if(isLeftChiild){
				parent.left = current.left
			}else{
				parent.right = current.left
			}
		}else if(current.left == null){
			if(current == this.root){
				this.root = current.right
			}else if(isLeftChiild){
				parent.left = current.right
			}else{
				parent.right = current.right
			}
		}else{//删除节点有两个节点,前驱:比current小一点的节点,后继:比current大一点的
			var successor = this.getSuccessor(current)
			if(current == this.root){
				this.root = successor
			}else if(isLeftChiild){
				parent.left = successor
			}else{
				parent.right = successor
			}
			successor.left = current.left
		}	
	}
	
	//找后继的方法
	BinarySearchTree.prototype.getSuccessor = function(delNode){
		//保存找到的后继
		var successor = delNode
		var current = delNode.right
		var successorParent = delNode
		while(current != null){
			successorParent = successor
			successor = current
			current = current.left
		}
		//判断寻找的后继节点是否直接就是delNode的right节点
		if(successor != delNode.right){
			console.log(successorParent.left,'1')
			// console.log(typeof (successor.right),'2')
			//?这个地方sp != sr,因为sp.l和s.r最初都指向s.r 后面s.r指向d.r节点改变的是s.r的指向空间,画图更好理解
			successor.right = new Node(777) 
			successorParent.left = successor.right
			console.log(successorParent.left,'3')
			successor.right.key = 888
			successor.right = delNode.right
			console.log(successorParent.left,'5')
			console.log(successor.right,'4')
		}
		return successor
	}
}


var bst = new BinarySearchTree()

bst.insert(11)
bst.insert(7)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(13)
bst.insert(12)
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(25)
bst.insert(6)

// bst.insert(1)
// bst.insert(2)
// bst.insert(3)
// bst.insert(4)

// bst.insert(4)
// bst.insert(3)
// bst.insert(2)
// bst.insert(1)

var resultString = ''

// bst.preOrderTraversal(function(key){
// 	resultString += key + ' '
// })

// bst.midOrderTraversal(function(key){
// 	resultString += key + ' '
// })
bst.lastOrderTraversal(function(key){
	resultString += key + ' '
})
console.log(resultString)
// bst.remove(9)
// bst.remove(7)
bst.remove(15)


