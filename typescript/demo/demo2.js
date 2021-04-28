// 函数
// function f1(age:number):string{
// 	return 'f1'+age
// }
// var age:number = 12
// var rs:string = f1(age)
// console.log(rs)
// // 有可选参数的函数,加？
// function f2(age:number,height?:string):string{
// 	let yy:string = ''
// 	yy = 'f2'+age
// 	if(height!==undefined){
// 		yy+=height
// 	}
// 	return yy
// }
// rs = f2(15)
// console.log(rs)
// // 有默认参数的函数
// function f3(age:number=16,height:string='666'):string{
// 	return 'f3'+age+height
// }
// console.log(f3())
// // 有剩余参数的函数
// function f4(...rest:string[]):string{
// 	let yy:string = 'f4'
// 	for(let i = 0;i<rest.length;i++){
// 		yy+=rest[i]
// 	}
// 	return yy
// }
// console.log(f4('1','2','3','4'))
// 函数声明法
function add(n1, n2) {
    return n1 + n2;
}
console.log(add(1, 2));
// 函数表达式法
var add2 = function (n1, n2) {
    return n1 + n2;
};
console.log(add2(3, 4));
// 完全支持es6
var add3 = function (n1, n2) { return n1 + n2; };
console.log(add3(1, 1));
