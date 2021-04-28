// 泛型 JJJ的可以是自定义值,当调用的时候是以调用指定的类型进行运行
// function joi(first: string | number,second: string | number){
// 	return `${first}${second}`
// }
// function joi<JJ>(first: JJ,second: JJ){
// 	return `${first}${second}`
// }
// // JJ在这里是number
// joi<number>(1,2)

// // 泛型中数组的使用
// function mFunc<ANY>(params: ANY[]){
// 	return params
// }

// mFunc<string>(['1','2'])

// // 多个泛型定义
// function joi<JJ,PP>(first: JJ,second: PP){
// 	return `${first}${second}`
// }
// joi<string,number>('1',2)

// 类泛型
// class SSS<T>{
// 	constructor (private g: T[]){
		
// 	}
// 	getG(index:number):T{
// 		return this.g[index]
// 	}
// }
// const s = new SSS<string>(['1','2','3'])


// 泛型继承
// interface S{
// 	name: string;
// }
// class SSS<T extends S>{ //泛型继承后必须有name值{ name: 'x'}格式
// private g
// 	constructor ( g: T[]){
// 		this.g = g
// 	}
// 	getG(index:number):string{
// 		return this.g[index].name
// 	}
// }
// const s = new SSS([
// 	{name: '1'},
// 	{name: '2'},
// 	{name: '3'}
// ])
// console.log(s.getG(0))


class SSS<T extends number | string>{//泛型约束
	constructor (private g: T[]){
		
	}
	getG(index:number):T{
		return this.g[index]
	}
}
const s = new SSS<string>(['1','2','3'])
console.log(s.getG(0))