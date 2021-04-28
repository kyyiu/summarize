function Set(){
	this.items = {}
	
	Set.prototype.add = function(value){
		if(this.has(value)){
			return false
		}
		this.items[value] = value
		return true
	}
	
	
	Set.prototype.has = function(value){
		return this.items.hasOwnProperty(value)
	}
	
	Set.prototype.remove = function(value){
		if(!this.has(value)) return false
		delete this.items[value]
		return true
	}
	
	Set.prototype.clear = function(){
		this.items = {}
	}
	
	
	Set.prototype.size = function(){
		return Object.keys(this.items).length
	}
	
	Set.prototype.values = function(){
		return Object.keys(this.items)
	}
	
	Set.prototype.union = function(otherSet){
		var unionSet = new Set()
		var values = this.values()
		for(var i= 0;i<values.length;i++){
			unionSet.add(values[i])
		}
		values = otherSet.values()
		for(var i = 0; i< values.length;i++){
			unionSet.add(values[i])
		}
		return unionSet
	}
	
	Set.prototype.intersection = function(otherSet){
		var intersectionSet = new Set()
		var values = this.values()
		for(var i=0;i<values.length;i++){
			var items = values[i]
			if(otherSet.has(items)) {
				intersectionSet.add(items)
			}
		}
		return intersectionSet
	}
	//差集
	Set.prototype.difference = function(otherSet){
		var differenceSet = new Set()
		var values = this.values()
		for(var i = 0;i<values.length;i++){
			var item = values[i]
			//另一个集合没有时返回false
			if(!otherSet.has(item)){
				differenceSet.add(item)
			}
		}
		return differenceSet
	}
	
	//子集,判断调用对象是否是传入对象的子集
	Set.prototype.subset = function(otherSet){
		var values = this.values()
		for(var i=0;i<values.length;i++){
			var item = values[i]
			if(!otherSet.has(item)) return false
		}
		return true
	}
}


var s = new Set()
var e = new Set()
var t = new Set()
s.add('a')
s.add('b')
s.add('c')

e.add('a')
e.add('e')
e.add('c')

t.add('a')
console.log(s.values(),e.values())
console.log(s.union(e))
console.log(s.intersection(e))
console.log(s.difference(e))
console.log(s.subset(t),t.subset(s))