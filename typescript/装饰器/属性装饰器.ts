// 属性装饰器表达式在运行时被当作函数调用，需要传递两个参数
// 参数1：对于静态成员来说是类的构造函数、对于实例成员来说是类的原型对象
// 参数2：成员的名称


function decorateF(args) {
  return function(target, attr) {
    target[attr] = 'xyz'
  }
}

class C {
  @decorateF('abc')
  public data

  constructor(){}
  getData() {
    console.log(this.data);
    
  }
}

const oC = new C()
oC.getData()