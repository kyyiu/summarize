// 方法装饰器会被应用到方法的属性描述上，可以用来监视、修改或替换方法定义
// 方法装饰器运行时需要传入三个参数：
// - 对于静态成员来说是类的构造函数，对于实例成员来说是类的原型对象
// - 成员的名称
// - 成员的属性描述符

function decorateF(parasm) {
  return function(target, methodName, funcInfo) {
    console.log('mmm', methodName,funcInfo);
    target.addF = function() {
      console.log('mmm我是addF');
    }
    const t = funcInfo.value
    funcInfo.value = function(...arg) {
      console.log('mmmx',arg);
      t.apply(this, arg)
    }
  }
}

class Tes {
  constructor() {}
  @decorateF('hh')
  getData() {
    console.log('mmmzz');
    
  }
}
const t = new Tes()
t.getData() 
t.addF()

// mmm getData {writable: true, enumerable: false, configurable: true, value: ƒ}
// mmmx []
//  mmmzz
// mmm我是addF