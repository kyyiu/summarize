// 类是对象具体事物的一个抽象，对象是类的具体表现
// class Woman{
// 	public sex:string //公共属性
// 	protected name:string //保护属性,只能在类及其子类访问
// 	private age:number //私有属性在类中访问
// 	public constructor(sex:string,name:string,age:number){
// 		this.sex = sex
// 		this.name = name
// 		this.age = age
// 	}
// 	public sayHello(){
// 		console.log('hello')
// 	}
// 	protected sayLove(){
// 		console.log('love')
// 	}
// }
var mhus = { sex: 'nan', interest: 'game' };
console.log(mhus); // {sex:'nan',interest:'game'}
var s;
s = function (source, subString) {
    var flag = source.search(subString);
    return flag !== -1;
};
console.log(s('1,2,3', '4')); //false
// 命名空间
var shuaiGe;
(function (shuaiGe) {
    var Dehua = /** @class */ (function () {
        function Dehua() {
            this.name = '刘德华';
        }
        Dehua.prototype.talk = function () {
            console.log('1');
        };
        return Dehua;
    }());
    shuaiGe.Dehua = Dehua;
})(shuaiGe || (shuaiGe = {}));
var bajie;
(function (bajie) {
    var Dehua = /** @class */ (function () {
        function Dehua() {
            this.name = '马德华';
        }
        Dehua.prototype.talk = function () {
            console.log('2');
        };
        return Dehua;
    }());
    bajie.Dehua = Dehua;
})(bajie || (bajie = {}));
var d1 = new shuaiGe.Dehua();
var d2 = new bajie.Dehua();
d1.talk(); //1
d2.talk(); //2
