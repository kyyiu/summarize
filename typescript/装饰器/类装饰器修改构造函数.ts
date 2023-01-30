function decorate(obj) {
  return class extends obj {
    data = '修改数据'
    getData() {
      this.data += '=='
      console.log(this.data);
    }
  }
}

@decorate
class C {
  public data
  constructor() {
    this.data = '数据'
  }
  getdData() {
    console.log(this.data);
  }
}