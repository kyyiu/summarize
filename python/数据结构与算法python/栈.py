# 1、list.append(obj)：在列表末尾添加新的对象
# 2、list.count(obj)：统计某个元素在列表中出现的次数
# 3、list.extend(seq)：在列表末尾一次性追加另一个序列中的多个值（用新列表扩展原来的列表）
# 4、list.index(obj)：从列表中找出某个值第一个匹配项的索引位置
# 5、list.insert(index, obj)：将对象插入列表
# 6、list.pop(obj=list[-1])：移除列表中的一个元素（默认最后一个元素），并且返回该元素的值
# 7、list.remove(obj)：移除列表中某个值的第一个匹配项
# 8、list.reverse()：反向列表中元素
# 9、list.sort([func])：对原列表进行排序


class Stack:
    __Stack = []

    def add(self, data):
        self.__Stack.append(data)

    def out(self):
        if(not self.isEmpty()):
            self.__Stack.pop()
            return
        return False

    def peek(self):
        return self.__Stack[len(self.__Stack)-1]

    def isEmpty(self):
        return len(self.__Stack) == 0

    def size(self):
        return len(self.__Stack)

    def traverse(self):
        for x in self.__Stack:
            print(x,end=',')

if __name__=='__main__':
    s = Stack()
    print(s.isEmpty(),s.size())
    s.add(1)
    print(s.isEmpty(),s.size())
    s.add(2)
    s.add(3)
    s.traverse()
    print('\n')
    s.out()
    s.traverse()
    print('\n',s.peek())
