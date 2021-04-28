// 联合类型和类型保护
interface Waiter {
	anjiao: boolean;
	say: ()=>{};
}
interface Teacher{
	anjiao: boolean;
	skill: ()=>{}
}
function judge(a: Waiter | Teacher){
	// W的话没有skill技能,T的话没有say
	if(a.anjiao){
		(a as Waiter).say()
	}else{
		(a as Teacher).skill()
	}
}

function judge(a: Waiter | Teacher){
	// W的话没有skill技能,T的话没有say
	if('skill' in a){
		a.skill()
	}else{
		a.say()
	}
}

function add(first: string | number, second: string | number){
	if(typeof first === 'string' || typeof second==='string'){
		return `${first}${second}`
	}
	return first+second
}

class NumberObj{
	count:number;
}
function addd(first: object | NumberObj, second: Object|NumberObj){
	if(first instanceof NumberObj && second instanceof NumberObj){
		return first.count + second.count
	}
	return 0
}