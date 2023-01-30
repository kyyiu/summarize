function decorate(args: any) {
  return function(rawObj) {
    rawObj.prototype.data = args
  }
}

@decorate('123')
class C {
  constructor() {}
  foo() {}
}

const oC = new C()
oC.data
oC.foo()