// 参数装饰器会在运行时当作函数调用，可以使用参数装饰器为类的原型增加一些元素数据，传入下列3个参数：
// - 对于静态成员来说是类的构造函数，对于实例成员来说是类的原型对象
// - 方法的名称
// - 参数在函数参数列表中的索引


function logParams (params:any) {
  return function (target: any, methodsName: any, paramsIndex: any) {
      console.log(target)
      console.log(methodsName)
      console.log(paramsIndex)
      target.apiUrl = params
  }
}

class HttpRequest {
  public url: string | undefined;
  constructor() {
  }
  getParams() {}
  getData(name:string, @logParams('uuid') uuid:any) {
      console.log('我是构造器中的方法')
  }
}
var http:any = new HttpRequest();
http.getData('12123',123123);
console.log(http.apiUrl);