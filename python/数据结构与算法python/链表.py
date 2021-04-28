from dataclasses import dataclass
# from dataclasses import field


@dataclass
class Node:
    data: int = None
    next: None = None

class LinkTable:
    __head = None
    __length = 0

    def __init__(self):
        pass

    def addElement(self, data):
        if(self.__length == 0):
            newNode = Node(data)
            self.__head = newNode
        else:
            newNode = Node(data)
            current = self.__head
            while current.next:
                current = current.next
            current.next = newNode
        self.__length += 1


    def traverse(self):
        current = self.__head
        while current:
            print(current.data, end='-')
            current = current.next
        print('\n')

    def insert(self,position,data):
        if(position < 1 or position > self.__length):
            print('error')
            return False
        newNode = Node(data)
        if(position == 1):
            newNode.next = self.__head
            self.__head = newNode
        else:
            index = 1
            previous = None
            current = self.__head
            newNode = Node(data)
            while index < position:
                previous = current
                current = current.next
                index += 1
            newNode.next = current
            previous.next = newNode
        self.__length += 1
        return True

    def get(self,position):
        if (position < 1 or position > self.__length): return False
        index = 1
        current = self.__head
        while index < position :
            current = current.next
            index += 1
        return current.data

    def index(self,data):
        current = self.__head
        position = 1
        while current:
            if(current.data == data): return position
            current = current.next
            position += 1
        return False

    def removeP(self,position):
        if (position < 1 or position > self.__length): return False
        current = self.__head
        if(position == 1):
            self.__head = self.__head.next
        else:
            index = 1
            previous = None
            while index < position:
                previous = current
                current = current.next
                index += 1
            previous.next = current.next
        self.__length -= 1
        return  current.data

    def updata(self,position,data):
        if (position < 1 or position > self.__length): return False
        index = 1
        current = self.__head
        while index < position:
            current = current.next
            index += 1
        current.data = data
        return True




    def removeD(self,data):
        p = self.index(data)
        return self.removeP(p)



    def getLength(self):
        return self.__length

    def isEmpty(self):
        return self.__length == 0






@dataclass
class Node2:
    pre: None = None
    data: int = None
    next: None = None

class doubleLinkTabel:
    __head = None
    __tail = None
    __length = 0

    def __init__(self):
        pass

    def addElement(self, data):
        newNode = Node2(data=data)
        if(self.__length == 0):
            self.__head = newNode
            self.__tail = newNode
        else:
            newNode.pre = self.__tail
            self.__tail.next = newNode
            self.__tail = newNode
        self.__length += 1
        return True

    def traverseH2T(self):
        current = self.__head
        while current:
            print(current.data, end='-')
            current = current.next
        print('\n')
        return True

    def traverseT2H(self):
        current = self.__tail
        while current:
            print(current.data, end='-')
            current = current.pre
        print('\n')
        return True

    def insert(self, position, data):
        if(not self.inlimit(position)): return False
        newNode = Node2(data = data)
        current = self.__head
        if(position == 1):
            current.pre = newNode
            newNode.next = current
            self.__head = newNode
        else:
            previous = None
            index = 1
            while index < position:
                previous = current
                current = current.next
                index += 1
            newNode.pre = previous
            previous.next = newNode
            newNode.next = current
            current.pre = newNode
        self.__length += 1

        return self.size()

    def index(self, data):
        current = self.__head
        position = 1
        while current:
            if(current.data == data):
                return position
            current = current.next
            position += 1
        return False

    def removeP(self, position):
        if(not self.inlimit(position)): return False
        current = self.__head
        if(position == 1):
            current.next.pre = None
            self.__head = current.next
        elif (position == self.__length):
            current = self.__tail
            current.pre.next = None
            self.__tail = current.pre
        else:
            previous = None
            index = 1
            while index < position:
                previous = current
                current = current.next
                index += 1
            previous.next = current.next
            current.next.pre = previous
        self.__length -= 1
        return True

    def removeD(self, data):
        self.removeP(self.index(data))

    def updata(self,position,data):
        if(not self.inlimit(position)): return False
        if(position == 1):
            self.__head.data = data
        elif(position == self.__length):
            self.__tail.data = data
        else:
            if(position < self.__length//2):
                current = self.__head
                index = 1
                while index < position:
                    current = current.next
                    index += 1
                current.data = data
            else:
                current = self.__tail
                index = 1
                while index < position:
                    current = current.pre
                    index += 1
                current.data = data
        return True

    def inlimit(self,position):
        if (position < 1 or position > self.__length):
            print('error')
            return False
        return True

    def get(self,position):
        if(not self.inlimit(position)): return False
        current = self.__head
        if(position < self.__length//2):
            index = 1
            while index < position:
                current = current.next
                index += 1
        else:
            current = self.__tail
            index = self.__length
            while index > position:
                current = current.pre
                index -= 1
        return current.data

    def isEmpty(self):
        return  self.__length == 0

    def size(self):
        return self.__length

    def getH(self):
        return self.__head

    def getT(self):
        return self.__tail





if __name__=='__main__':
    # 双向链表测试
    dl = doubleLinkTabel()
    # print(dl.isEmpty(), dl.size())
    dl.addElement(1)
    # print(dl.isEmpty(), dl.size())
    dl.addElement(2)
    dl.addElement(3)
    dl.insert(3, 5)
    dl.insert(1, 6)
    dl.traverseH2T()
    print('position', dl.index(9), dl.index(6), dl.index(2), dl.index(3))
    dl.removeP(1)
    dl.traverseH2T()
    dl.removeP(4)
    dl.traverseH2T()
    dl.removeP(2)
    dl.traverseH2T()
    dl.traverseT2H()
    dl.removeD(6)
    dl.traverseH2T()
    dl.removeD(3)
    dl.traverseH2T()
    dl.removeD(4)
    dl.traverseH2T()
    dl.updata(1,9)
    # dl.updata(5,8)
    # dl.updata(3,7)
    dl.traverseH2T()
    print(dl.get(1),dl.get(3),dl.get(5))
    # print(dl.getH())
    # print(dl.getT())







    # 单向链表测试
    # s = LinkTable()
    # print(s.isEmpty())
    # s.addElement(1)
    # # s.traverse()
    # s.addElement(2)
    # # s.traverse()
    # s.insert(1, 3)
    # # s.traverse()
    # s.insert(3, 4)
    # s.traverse()
    # # print(s.getLength())
    # # print(s.get(4))
    # # print(s.index(5))
    # # print(s.removeP(3))
    # # s.traverse()
    # # print(s.isEmpty())
    # print(s.removeD(2))
    # s.traverse()
    # s.updata(3,8)
    # s.traverse()




