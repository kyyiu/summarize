function decorateF(params: any) {
  params.prototype.data = '动态扩展参数'
  params.prototype.foo = function() {
    console.log('动态扩展方法');
  }
}

@decorateF
class CCC {
  getData() {
    throw new Error("Method not implemented.");
  }
  constructor() {}
  func() {}
}

const oC = new CCC()
oC.data
oC.foo()