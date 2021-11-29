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


// 递归序 1, 2,2,2, 1, 3,3,3, 1
f(t) {
	if (!t) {
		return
	}
	// 第一次进入本次f,这里处理则是先序遍历，第一次进入本次f时就记录
	f(t.left)
	// 第二次进入本次f,这里处理则是中序遍历，第二次进入本次f时就记录
	f(t.right)
	// 第三次进入本次f,这里处理则是后序遍历，第三次进入本次f时就记录
}


// 遍历实现
// 先序
pre(head) {
	let stack = []
	if (head !== null) {
		stack.push(head)
		while(stack.length > 0) {
			head = stack.pop()
			// console.log(head.val) 此次处理，为先序
			if (head.right !== null) {
				stack.push(head.right)
			}
			if (head.left !== null) {
				stack.push(head.left)
			}
		}
	}
}

// 后序遍历
back(head) {
	if (head !== null) {
		// s1压栈顺序是树的根左右
		let s1 = []
		// s2的压栈顺序的根据s1的弹出，是s1的弹出逆序，s1的弹出顺序是根右左，即最后就是左右根
		let s2 = []
		s1.push(head)
		while (s1.length > 0) {
			head = s1.pop()
			// 第一次执行时，把根放到了s2的底部
			s2.push(head)
			// 先在s1压左节点，后压右节点，每次循环s1先弹出,最后在s2弹出的顺序就是左右根
			if(head.left !== null) {
				s1.push(head.left)
			}
			if( head.right !== null) {
				s1.push(head.right)
			}
		}
		while(s2.length>0) {
			console.log(s2.pop().val)
		}
	}
}

// 中序遍历
// 每个子树的左边界依次进栈
// 依次弹出
// 弹出的过程中压入弹出节点的右树左边界
// 这样压入的顺序是根左
// 弹出的时候就是左根
// 过程中右树是后处理的
// 即左根右
mid(head) {
	if(head !== null) {
		let s = []
		while(s.length > 0 || head!==null) {
			if (head !== null) {
				// 一直往左边找，不停的压栈
				s.push(head)
				head = head.left
			} else {
				// 左边界压完了，弹出，如果该节点有右孩子，则会压入并继续压入它的左边界
				head = s.pop()
				console.log(head.val)
				head = head.right
			}
		}
	}
}


 int getWidth(BiNode head) {    
     if(head==null)    
         return 0;    
     int max=1;    
     LinkedList<BiNode>ll=new LinkedList<BiNode>();    
        ll.add(head);    
        while(true){    
            int len=ll.size();   //获取当前层的节点数 
            if(len==0)  //队列空，二叉树已经遍历完  
                break;    
            while(len>0){    
                BiNode b=ll.poll();    
                len--;    //出一个结点-1，为0就退循环
                if(b.left!=null)    
                    ll.add(b.left);    
                if(b.right!=null)    
                    ll.add(b.right);    
            }    
            max=Math.max(max, ll.size());              
        }    
        return max;    
    }  
	
	
// 如何判断一个树是搜索二叉树 ； 使用中序遍历

// 如何判断完全二叉树 （除了最后一层，其他层都有节点，最后一层的节点集中在左边）
// ： 按宽度遍历，任意节点有右无左为false, 在不违规前面的情况下遇到了第一个左右孩子不全，后面的节点都必须是叶子节点

// 判断满二叉树（节点个数和深度关系N=2^h-1

// 平衡二叉树（左树和右数的高度差不能超过1）： 左数是平衡树，右数是平衡树，且左右高度差绝对值《=1

// 树形dp套路
// 1.需要从左右获取那些信息,往上返回
// 2.left = func(x.left) , right = func(x.right)， 递归左右子树
// 3.处理left和right中拿到的数据，返回结果