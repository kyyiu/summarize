from queue import Queue


class Graph:
    __vertexes = []
    __dic = {}
    __color = {}

    def addVertex(self,v):
        self.__vertexes.append(v)
        self.__dic.setdefault(v,[])

    def addEdge(self,start,end):
        key = self.__dic.keys()
        if(start not in key or end not in key): return False
        self.__dic.get(start).append(end)
        self.__dic.get(end).append(start)

    def travers(self):
        keys = self.__dic.keys()
        for k in keys:
            print(k,end=':')
            for i in range(len(self.__dic[k])):
                print(self.__dic[k][i],end=' ')
            print('\n')

    def iniColor(self):
        self.__color.clear()
        for x in self.__vertexes:
            self.__color[x] = 'white'
        return self.__color


    def bfs(self,peek):
        queue = []
        queue.append(peek)
        self.iniColor()
        while queue:
            element = queue.pop(0)
            e_link = self.__dic[element]
            self.__color[element] = 'gray'
            for x in e_link:
                if self.__color[x] == 'white':
                    queue.append(x)
                    self.__color[x] = 'gray'
            self.__color[element] = 'black'
        return self.__color


    def dfs(self,peek):
        self.iniColor()
        self.dfsV(peek)
        return self.__color

    def dfsV(self,peek):
        self.__color[peek] = 'gray'
        print(self.__color)
        e = self.__dic[peek]
        for x in e:
            if self.__color[x] == 'white':
                self.dfsV(x)
        self.__color[peek] = 'black'




if __name__=='__main__':
    g = Graph()
    g.addVertex('A')
    g.addVertex('B')
    g.addVertex('C')
    g.addVertex('D')
    g.addVertex('E')
    g.addVertex('F')
    g.addVertex('G')
    g.addVertex('H')
    g.addVertex('I')

    g.addEdge('A', 'B')
    g.addEdge('A', 'C')
    g.addEdge('A', 'D')
    g.addEdge('C', 'D')
    g.addEdge('C', 'G')
    g.addEdge('D', 'G')
    g.addEdge('D', 'H')
    g.addEdge('B', 'E')
    g.addEdge('B', 'F')
    g.addEdge('E', 'I')

    # g.travers()
    # print(g.bfs('A'))
    g.dfs('A')
