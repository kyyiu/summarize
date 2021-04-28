from dataclasses import dataclass

@dataclass
class Node:
    left: int = None
    data: int = None
    right: int = None


class BinarySearchTree:
    __root = None
    __str = ''

    def insert(self,data):
        newNode = Node(data=data)
        if(self.__root == None):
            self.__root = newNode
        else:
            self.insertNode(self.__root,newNode)


    def insertNode(self,root,newnode):
        if(newnode.data < root.data):
            if(root.left == None):
                root.left = newnode
            else:
                self.insertNode(root.left,newnode)

        else:
            if(root.right == None):
                root.right = newnode
            else:
                self.insertNode(root.right,newnode)

    def preOrderTraversal(self):
        self.__str = ''
        self.preOrderTraversalNode(self.__root)

    def preOrderTraversalNode(self,node):
        if(node != None):
            self.__str += ','+str(node.data)
            self.preOrderTraversalNode(node.left)
            self.preOrderTraversalNode(node.right)

    def midOrderTraversal(self):
        self.__str = ''
        self.midOrderTraversalNode(self.__root)

    def midOrderTraversalNode(self,node):
        if(node != None):
            self.midOrderTraversalNode(node.left)
            self.__str += str(node.data)
            self.midOrderTraversalNode(node.right)

    def lastOrderTraversal(self):
        self.__str = ''
        self.lastOrderTraversalNode(self.__root)

    def lastOrderTraversalNode(self,node):
        if (node != None):
            self.lastOrderTraversalNode(node.left)
            self.lastOrderTraversalNode(node.right)
            self.__str += ','+str(node.data)

    def max(self):
        current = self.__root
        while current.right:
            current = current.right
        return current.data

    def min(self):
        current = self.__root
        while current.left:
            current = current.left
        return current.data

    def getStr(self):
        return self.__str

    def search(self,key):
        current = self.__root
        while current:
            if(key < current.data):
                current = current.left
            elif(key > current.data):
                current = current.right
            else:
                return True
        return False


    def remove(self,data):
        current = self.__root
        parent = None
        isLeftChild = True
        while current.data != data:
            parent = current
            if(data < current.data):
                current = current.left
                isLeftChild = True
            else:
                current = current.right
                isLeftChild = False
            if(current == None): return False

        if(current.left == None and current.right == None):
            if(current == self.__root):
                self.__root = current.left
            elif(isLeftChild):
                parent.left = None
            else:
                parent.right = None
        elif(current.left == None):
            if(current == self.__root):
                self.__root = current.right
            elif(isLeftChild):
                parent.left = current.right
            else:
                parent.right = current .right
        elif(current.right == None):
            if(current == self.__root):
                self.__root = current.left
            elif(isLeftChild):
                parent.left = current.left
            else:
                parent.right = current.left
        else:
            successor = self.getSuccessor(current)
            if(current == self.__root):
                self.__root = successor
            elif(isLeftChild):
                parent.left = successor
            else:
                parent.right = successor
            successor.left = current.left


    def getSuccessor(self,delNode):
        successor = delNode
        current = delNode.right
        successorParent = delNode
        while current != None:
            successorParent = successor
            successor = current
            current = current.left

        if(successor != delNode.right):
            successorParent.left = successor.right
            successor.right = delNode.right

        return successor




if __name__=='__main__':
    bst = BinarySearchTree()
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
    bst.preOrderTraversal()
    print(bst.getStr())
    print(bst.min(), bst.max())
    print(bst.search(18))
    bst.remove(9)
    bst.remove(7)
    bst.remove(15)
    bst.preOrderTraversal()
    print(bst.getStr())