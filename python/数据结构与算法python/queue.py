# clear() 函数用于删除字典内所有元素。
# seq = ['a','b'],d={a:1,b:2}
# fromkeys(seq,value) 函数用于创建一个新字典，以序列seq中元素做字典的键，value为字典所有键对应的初始值。
# get() 函数返回指定键的值，如果值不在字典中返回默认值。d.get(key[,value])
# in 操作符用于判断键是否存在于字典中，如果键在字典dict里返回true，否则返回false
# keys() 方法以列表返回一个字典所有的键。
# setdefault() 方法和get()方法类似, 如果键不已经存在于字典中，将会添加键并将值设为默认
# update() 函数把字典参数 dict2 的 key/value(键/值) 对更新到字典 dict 里。dict1.update(dict2)
# values() 方法以列表返回字典中的所有值
# pop() 方法删除字典给定键 key 所对应的值，返回值为被删除的值。key值必须给出。 否则，返回default值
# popitem() 方法随机返回并删除字典中的一对键和值(一般删除末尾对)。如果字典已经为空，却调用了此方法，就报出KeyError异常
from dataclasses import dataclass

class Queue:
    __queue = []

    def add(self, data):
        self.__queue.append(data)

    def out(self):
        if(not self.isEmpty()):
            return self.__queue.pop(0)
        return False

    def peek(self):
        return self.__queue[0]

    def isEmpty(self):
        return len(self.__queue) == 0

    def size(self):
        return len(self.__queue)

    def traverse(self):
        for x in self.__queue:
            print(x,end=',')


@dataclass
class PQNode:
    data: int = None
    weight: int = None


class PriorityQueue:
    __PQ = []

    def add(self, data, weight):
        newNode = PQNode(data, weight)
        if(not self.__PQ):
            self.__PQ.append(newNode)
            return
        index = 0
        for x in self.__PQ:
            if(weight <= x.weight):
                self.__PQ.insert(index, newNode)
                return index
            index += 1
        self.__PQ.append(newNode)
        return True

    def out(self):
        if(not self.isEmpty()):
            self.__PQ.pop(0)
            return True
        return  None


    def traverse(self):
        if(not self.isEmpty()):
            for x in self.__PQ:
                print(x.data,end=',')
        print('\n')
        return False

    def size(self):
        return len(self.__PQ)

    def isEmpty(self):
        return self.size() == 0

    def front(self):
        return self.__PQ[0].data

if __name__=='__main__':
    # 优先级队列测试
    pq = PriorityQueue()
    print(pq.isEmpty(),pq.size())
    pq.add(1,1)
    print(pq.isEmpty(), pq.size())
    pq.add(2,5)
    pq.add(2, 7)
    pq.add(6,2)
    pq.traverse()
    pq.out()
    pq.traverse()
    print(pq.front())


    # 队列测试
    # s = Queue()
    # print(s.isEmpty(), s.size())
    # s.add(1)
    # print(s.isEmpty(), s.size())
    # s.add(2)
    # s.add(3)
    # s.traverse()
    # print('\n')
    # s.out()
    # s.traverse()
    # print('\n', s.peek())
