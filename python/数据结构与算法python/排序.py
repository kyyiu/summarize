class Sort:

    __arr = None

    def swap(self,i,j):
        temp = self.__arr[i]
        self.__arr[i] = self.__arr[j]
        self.__arr[j] = temp

    def Bubble(self,arr):
        self.__arr = arr
        for i in range(0,len(arr)):
            for j in range(0,len(arr)-i-1):
                if(arr[j] > arr[j+1]): self.swap(j,j+1)
        return arr

    def Select(self,arr):
        self.__arr = arr
        for i in range(len(arr)):
            min = i
            for j in range(i+1,len(arr)):
                if(arr[j] < arr[min]):
                    min = j
            self.swap(i,min)
        return arr

    def insert(self,arr):
        for i in range(1,len(arr)):
            temp = arr[i]
            j = i
            while j > 0 and arr[j-1] > temp:
                arr[j] = arr[j-1]
                j -= 1
            arr[j] = temp
        return arr

    def shell(self,arr):
        gap = len(arr)//2
        while gap >= 1:
            for i in range(gap,len(arr)):
                temp = arr[i]
                j = i
                while arr[j-gap] > temp and j > gap-1:
                    arr[j] = arr[j-gap]
                    j -= gap
                arr[j] = temp
            gap //= 2
        return arr

    def quick(self,arr):
        self.__arr = arr
        self.quickSort(0,len(arr)-1)
        return arr

    def mid(self,left,right):
        center = (left+right)//2
        if self.__arr[left] > self.__arr[center]:
            self.swap(left,center)
        if self.__arr[center] > self.__arr[right]:
            self.swap(center,right)
        if self.__arr[left] > self.__arr[center]:
            self.swap(left, center)

        self.swap(center,right-1)
        return self.__arr[right-1]


    def quickSort(self,left,right):
        print(left,right)
        if(left>=right): return
        pivot = self.mid(left,right)
        i = left
        j = right-2
        while i<=j:
            print(left,right)
            while i<=j and self.__arr[i]<pivot : i+=1
            while i<=j and self.__arr[j]>pivot : j-=1
            if(i < j):
                self.swap(i,j)
            else:
                break
        self.swap(i,right-1)
        self.quickSort(left,i-1)
        self.quickSort(i+1,right)


if __name__=='__main__':
    s = Sort()
    l = [5,4,3,2,1,0,6,11,2,3,4,5]
    k = [3,3,3,3,4,3,3,3]
    # print(s.Bubble(l))
    # print(s.Select(l))
    # print(s.insert(l))
    # print(s.shell(l))
    print(s.quick(k))
