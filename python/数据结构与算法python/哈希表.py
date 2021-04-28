import math
class HashTable:
    __storage = []
    __count = 0
    __limit = 7

    def __init__(self):
        for i in range(self.__limit):
            self.__storage.append([])

    def ini(self,size):
        for i in range(size):
            self.__storage.append([])

    def hashFunc(self,str,size):
        print(size,'a')
        hashCode = 0
        for i in str:
            hashCode = 37 * hashCode + ord(i)
        index = hashCode % size
        return index

    def add(self,key,value):
        index = self.hashFunc(key,self.__limit)
        bucket = self.__storage[index]
        if(bucket == None):
            bucket = []
            self.__storage[index] = bucket

        for x in bucket:
            if(key in x.keys()):
                x[key] = value
                return

        bucket.append({key:value})
        self.__count += 1
        if (self.__count > self.__limit * 0.8):
            newSize = self.getPrime(self.__limit*2)
            self.resize(newSize)
        return True


    def get(self,key):
        index = self.hashFunc(key,self.__limit)
        bucket = self.__storage[index]
        if(not bucket): return  None
        for x in bucket:
            if(key in x.keys()):
                print(x[key], end=',')
        print('\n')

    def remove(self,key):
        index = self.hashFunc(key, self.__limit)
        bucket = self.__storage[index]
        if(not bucket): return None
        for x in bucket:
            if(key in x.keys()):
                x.clear()
                self.__count -= 1
                return True
            if(self.__limit > 7 and self.__count < self.__limit*0.25):
                newSize = self.getPrime(math.floor(self.__limit/2))
                self.resize(newSize)
        return False

    def resize(self,newLimit):
        storage = self.__storage
        self.__storage = []
        self.__count = 0
        self.__limit = newLimit
        self.ini(self.__limit)
        for x in storage:
            if(not x): continue
            for y in x:
                for k in y:
                    self.add(k,y[k])

    def isPrime(self,num):
        for x in range(2,math.floor(math.sqrt(num)+1)):
            if(num % x == 0):
                return False
        return True

    def getPrime(self,num):
        while not self.isPrime(num):
            num += 1
        return num


    def isEmpty(self):
        return self.__count == 0

    def size(self):
        return self.__count

    def limit(self):
        return self.__limit

if __name__=='__main__':
    ht = HashTable()
    # ht.add('a',1)
    # ht.add('a',2)
    # ht.add('h',3)
    # ht.get('a')
    # ht.remove('a')
    # ht.get('a')


    ht.add('a', 'a')
    ht.add('b', 'b')
    # print(ht.get('a'))
    ht.add('a', 'd')
    # print(ht.get('a'))
    ht.add('c', 'c')
    # print(ht.isEmpty(), ht.size())

    print(ht.size(), ht.limit())
    ht.add('d', '2')
    ht.add('h', '1')
    ht.add('y', '3')
    ht.add('n', '8')
    print(ht.size(), ht.limit())
    ht.remove('a')
    ht.remove('c')
    ht.remove('b')
    ht.remove('d')
    ht.remove('h')
    ht.remove('y')
    ht.remove('n')
    print(ht.size(), ht.limit())
