var ArrayList = require('./列表')

function Sorting(){//升序
	this.arr = new ArrayList()
	
	Sorting.prototype.swap = function(m,n){
		var temp = this.arr.array[m]
		this.arr.array[m] = this.arr.array[n]
		this.arr.array[n] = temp
	}
	
	
	//思路,两两比较,大的放后面,最后一定是最大的,重复执行
	Sorting.prototype.bubbleSort = function(){
		var length = this.arr.array.length
		for(var i = length-1;i>=0;i--){
			for(var j = 0;j<i;j++){
				if(this.arr.array[j] > this.arr.array[j+1]){
					this.swap(j,j+1)
				}
			}
		}
	}
	
	//思路,设置一个min装最小值的下标,遍历,交换,,,相比冒泡交换次数少为N-1-> O(N)
	Sorting.prototype.slectionSort = function(){
		var length = this.arr.array.length
		for(var j = 0;j<length-1;j++){
			var min = j
			for(var i = min+1;i<length;i++){
				if(this.arr.array[min] > this.arr.array[i]){
					min = i
				}
			}
			this.swap(min,j)
		}
	}
	
	//插入排序,思路,局部有序,从后向前比较
	Sorting.prototype.insertSort = function(){
		var length = this.arr.array.length
		for(var i = 1;i<length;i++){
			var temp = this.arr.array[i]
			var j = i
			while(this.arr.array[j-1] > temp && j>0){
				this.arr.array[j] = this.arr.array[j-1]
				j--
			}
			this.arr.array[j] = temp 
		}
	}
	
	//希尔排序,思路,按间隔取数进行排序,不断缩小间隔,减少需要移动的距离,目的是尽量让每个数据接近排序后的位置
	Sorting.prototype.shellSort = function(){
		var length = this.arr.array.length
		//初始化增量,gap间隔,比如有个10长度的数组,gap为3则 下标为0,3,6,9的进行插入排序;1,4,7; 2,5,8; 当gap为1时就是插入排序原型
		var gap = Math.floor(length/2)
		while(gap>=1){
			for(var i = gap;i<length;i++){
				var temp = this.arr.array[i]
				var j = i
				while(this.arr.array[j-gap] > temp && j>gap-1){
					this.arr.array[j] = this.arr.array[j-gap]
					j -= gap
				}
				//将j位置的元素赋值给temp
				this.arr.array[j] = temp
			}
			gap = Math.floor(gap/2)
		}
	}
	
	
	//中值快排
	Sorting.prototype.median = function(left,right){//选择枢纽
		var center = Math.floor((left+right)/2)
		
		if(this.arr.array[left] > this.arr.array[center]){
			this.swap(left,center)
		}
		if(this.arr.array[center] > this.arr.array[right]){
			this.swap(center,right)
		}
		if(this.arr.array[left] > this.arr.array[center]){
			this.swap(left,center)
		}
		
		//将center换到right-1的位置,因为前面已经判断了right比cneter大
		this.swap(center,right-1)
		return this.arr.array[right-1]
	}
	
	Sorting.prototype.qiuckSort = function (){
		this.qiuck(0,this.arr.array.length-1)
	}
	
	Sorting.prototype.qiuck = function(left,right){
		//结束条件
		if(left>=right) return
		var pivot = this.median(left,right)
		var i = left
		var j = right -1
		while(i < j){//当right比left大1,此时i和j相等,j再--有可能变成负数
			//下面的是把比pivot大的放在右边,小的放左边,因为先--,所有实际上是从right-2开始的右指针
			while(this.arr.array[++i] < pivot){}//从数组左边开始往右查询,直到比pivot大停下,i此时为大的下标
			while(this.arr.array[--j] > pivot){}
			if(i < j){
				this.swap(i,j)
			}else{
				break
			}
		}
		//放置枢纽位置,当i+1=j的时候,j指向的总是大于等于pivot的即right-1位置的数;此时如果i位置上的数小于pivot则指向j的数,直接交换;如果大于,则j向左移动
		//重叠退出了循环,直接交换
		//综上,结束循环后,i(不能用j,有特殊情况,就是right-1之前的数已经有序,这时i会运行到j的位置即i=j,通常是i=j+1)总是指向大于或等于pivot的数,直接交换两个位置上的数即可
		console.log(left,right,i,j,this.arr.array.toString())
		this.swap(i,right-1)
		
		this.qiuck(left,i-1)
		this.qiuck(i+1,right)
	}
}

var list = new Sorting()

list.arr.insert(500)
list.arr.insert(600)
list.arr.insert(400)
list.arr.insert(300)
list.arr.insert(100)
list.arr.insert(100)
list.arr.insert(1100)
list.arr.insert(600)
list.arr.insert(100)
list.arr.insert(200)
list.arr.insert(300)

// list.bubbleSort()
// list.slectionSort()
// list.insertSort()
// list.shellSort()
list.qiuckSort()
console.log(list.arr.toString())