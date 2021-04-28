function N(){
	this.l = 1
	this.r = 2
}

var h = null
var s = new N()
var l =new N()
l.l = new N()
s.r = new N()
h = s
tem = l.l
l.l = s.r
l.l.l = 5
console.log(s.r)
s.r = tem
s.r.l = 9
console.log(l.l,tem,s.r)

