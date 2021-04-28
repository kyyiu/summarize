function ArrayList(){
	this.array = []
	ArrayList.prototype.insert = function(item){
		this.array.push(item)
	}
	ArrayList.prototype.toString = function(){
		return this.array.join('-')
	}
}

module.exports = ArrayList