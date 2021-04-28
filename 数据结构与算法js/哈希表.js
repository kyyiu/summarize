function HashTabel(){
	this.storage = []//所有元素存储,容量最好是质数
	this.count = 0//记录当前数组存放元素
	this.limit = 7//记录的长度
	
	//设计哈希函数
	//1 将字符串转换成比较大的数字:hashCode
	//2 将大的数字压缩到数组的范围之内
	HashTabel.prototype.hashFunc = function(str,size){
		//定义 hashCode 变量
		
		var hashCode = 0
		//霍纳算法(秦九韶算法),计算hashCode的值
		//unicode编码
		//charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数。
		//语法
		// stringObject.charCodeAt(index)
		// 参数	描述
		// index	必需。表示字符串中某个位置的数字，即字符在字符串中的下标。
		for(var i= 0;i<str.length;i++){
			hashCode = 37 * hashCode + str.charCodeAt(i)
		}
		//取余,保证不超过数组长度
		var index = hashCode % size
		return index
	}
	
	HashTabel.prototype.put = function(key,value){
		//根据key取出对应的index
		var index = this.hashFunc(key,this.limit)
		//根据index取出对应的bucket
		var bucket = this.storage[index]
		//判断bucket是否为null
		if(bucket == null){
			bucket = []
			this.storage[index] = bucket
		}
		//判断是否是修改数据
		for(var i= 0;i<bucket.length;i++){
			var  tuple = bucket[i]
			if(tuple[0]==key){
				tuple[1] = value
				return
			}
		}
		//添加
		bucket.push([key,value])
		this.count +=1
		//判断是否需要扩容
		if(this.count>this.limit*0.75){
			var newSize = this.limit*2
			var newPrime = this.getPrime(newSize)
			this.resize(newPrime)
		}
	}
	
	
	HashTabel.prototype.get = function(key){
		var index = this.hashFunc(key,this.limit)
		var bucket = this.storage[index]
		if(bucket == null) return null
		for(var i = 0;i< bucket.length;i++){
			var tuple = bucket[i]
			if(tuple[0] == key) return tuple[1]
		}
		return null
	}
	
	HashTabel.prototype.remove = function(key){
		var index = this.hashFunc(key,this.limit)
		var bucket = this.storage[index]
		if(bucket == null) return null
		for(var i= 0;i<bucket.length;i++){
			var tuple = bucket[i]
			if(tuple[0] == key){
				bucket.splice(i,1)
				this.count--
				return tuple[1]
			}
			//缩小容量
			if(this.limit>7 && this.count < this.limit*0.25){
				var newSize = Math.floor(this.limit/2)
				var newPrime = this.getPrime(newSize)
				this.resize(newPrime)
			}
		}
		return null
	}
	
	
	HashTabel.prototype.isEmpty = function(){
		return this.count == 0
	}
	
	
	HashTabel.prototype.size = function(){
		return this.count
	}
	
	
	HashTabel.prototype.resize = function(newLimit){
		var oldStorage = this.storage
		this.storage = []
		this.count = 0
		this.limit = newLimit
		
		for(var i = 0;i<oldStorage.length;i++){
			var bucket = oldStorage[i]
			if(bucket == null){
				continue
			}
			for(var j = 0;j<bucket.length;j++){
				var tuple = bucket[j]
				this.put(tuple[0],tuple[1])
			}
		}
	}
	
	HashTabel.prototype.isPrime = function(num){
		var temp = parseInt(Math.sqrt(num))
		for(var i = 2;i<=temp;i++){
			if(num%i == 0){
				return false
			}
		}
		return true
	}
	
	//获取质数
	HashTabel.prototype.getPrime = function(num){
		//是质数就会返回true,将退出循环
		while(!this.isPrime(num)){
			num++
		}
		return num
	}
	
}


//判断质数,不能被2~num-1整除
// function  isPrime(num){
// 	// for (var i = 2;i<num;i++){
// 	// 	if(num%i == 0){
// 	// 		return false
// 	// 	}
// 	// }
// 	// return true
	
// 	//高效率
// 	//如果一个数能因式分解,总能得到一个小于等于这个数开平方根或大于等于这个数开平方根的值
// 	//如16=2*8  16开方4 2<4 8>4 根据夹逼定理可以判断到sqrt(num)即可
// 	var temp = parseInt(Math.sqrt(num))
// 	for(var i = 2;i<=temp;i++){
// 		if(num%i == 0){
// 			return false
// 		}
// 	}
// 	return true
// }


var ht = new HashTabel()
ht.put('a','a')
ht.put('b','b')
console.log(ht.get('a'))
ht.put('a','d')
console.log(ht.get('a'))
ht.put('c','c')
console.log(ht.isEmpty(),ht.size())

console.log(ht.count,ht.limit)
ht.put('d','2')
ht.put('h','1')
ht.put('y','3')
ht.put('n','8')
console.log(ht.count,ht.limit)
ht.remove('a')
ht.remove('c')
ht.remove('b')
ht.remove('d')
ht.remove('h')
ht.remove('y')
ht.remove('n')
console.log(ht.count,ht.limit)
