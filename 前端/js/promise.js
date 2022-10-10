(function() {
  // 以往的异步编程模式
// 串联多个异步操作，即回调地狱
// settimeout 可以指定一个回调在一定时间后推到消息队列，
function double(v) {
  setTimeout(() => {
    setTimeout(console.log, 0, v * 2);
  }, 1000);
}

double(3) // 大概一秒后打印6

// 异步的返回值
// 广泛接受的策略是给异步操作提供一个回调，回调中包含要使用异步返回值的代码
function double2(v, cb) {
  setTimeout(() => {
    cb(v * 2)
  }, 1000);
}

double2(3, (v) => console.log(`给了我${v}`))

// 失败处理
function double3(v, scc, err) {
  setTimeout(() => {
    try {
      if (typeof v !== 'number') {
        throw 'need v'
      }
      scc(v * 2)
    } catch (e) {
      err(e)
    }
  }, 1000);
}

const s = (v) => {
  console.log('s', v);
}
const e = (v) => {
  console.log('e', v);
}
// 上面这种方式不可取，因为必须促使和异步操作时定义回调，并且返回值只能短暂时间内存在

// promise 基础
// 可以使用new实例化
// 创建时需要传入执行器函数作为参数
// 如果不提供执行器函数则会报错
let p = new Promise((re, rj) => { return re(); })
setTimeout(console.log, 500, p); // Promise { <pending> }

// promise状态
// pending resolved rejected
// promise状态一旦落定是不可逆的，并且是私有的无法读取修改：这是为了隔离外部的同步代码
// 执行器函数主要的功能：1. 初始化promise的异步行为和控制状态的最终转换
// 


// 等价promise
let p1 = new Promise((re, rj) => re())
let p2 = Promise.resolve()

// Promise.reject()
// 与Promise.resolve()类似，Promise.reject()会实例化一个拒绝的期约并抛出一个异步错误
// （这个错误不能通过try / catch捕获，而只能通过拒绝处理程序捕获）。下面的两个期约实例实际上是一样的：
let r1 = new Promise((resolve, reject) => reject()); 
let r2 = Promise.reject();
// 这个拒绝的期约的理由就是传给Promise.reject()的第一个参数。这个参数也会传给后续的拒绝处理程序：
let r = Promise.reject(3);
setTimeout(console.log, 0,r); // Promise <rejected>: 3
r.then(null, (e) => setTimeout(console.log, 0, e)); // 3
// 关键在于，Promise.reject()并没有照搬Promise.resolve()的幂等逻辑。如果给它传一个期约对象，则这个期约会成为它返回的拒绝期约的理由：
setTimeout(console.log, 0, Promise.reject(Promise.resolve()));// Promise <rejected>: Promise <resolved>
// 同步 / 异步执行的二元性
// Promise的设计很大程度上会导致一种完全不同于JavaScript的计算模式。下面的例子完美地展示了这一点，其中包含了两种模式下抛出错误的情形：
try {
  throw new Error('foo');
} catch(e) {
  console.log(e); // Error: foo
} 
try {
  Promise.reject(new Error('bar'));} 
catch(e) {
  console.log(e);
}// Uncaught(in promise) Error: bar
// 第一个try / catch抛出并捕获了错误，第二个try / catch抛出错误却没有
// 捕获到。乍一看这可能有点违反直觉，因为代码中确实是同步创建了一个拒绝的期约实例，而这个实例也抛出了包含拒绝理由的错误。这里的同步代码之所以没有捕获期约抛出的错误，是因为它没有通过异步模式
// 捕获错误。从这里就可以看出期返回的拒绝期约的理由：
// setTimeout(console.log, 0, Promise.reject(Promise.resolve()));// Promise <rejected>: Promise <resolved>
// 同步/异步执行的二元性
// Promise的设计很大程度上会导致一种完全不同于JavaScript的计算模式。下面的例子完美地展示了这一点，其中包含了两种模式下抛出错误的情形：
try {
  throw new Error('foo');} catch(e) {  
  console.log(e); // Error: foo
}try {
  Promise.reject(new Error('bar'));} 
catch(e) {  
  console.log(e);}// Uncaught (in promise) Error: bar
// 第一个try/catch抛出并捕获了错误，第二个try/catch抛出错误却没有
// 捕获到。乍一看这可能有点违反直觉，因为代码中确实是同步创建了一个拒绝的期约实例，而这个实例也抛出了包含拒绝理由的错误。这里的同步代码之所以没有捕获期约抛出的错误，是因为它没有通过异步模式
// 捕获错误。从这里就可以看出期约真正的异步特性：它们是同步对象（在同步执行模式中使用），但也是异步执行模式的媒介。

// 拒绝期约的错误并没有抛到执行同步代码的线程里，而是通过浏览器异步消息队列来处理的。因此，try/catch块并不能捕获该错误。代码一旦开始以异步模式执行，则唯一与之交互的方式就是使用异步结构——更具体地说，就是使用期约的方法。

});


// promise api
(function() {
  // Promise.prototype.then()方法返回一个新的期约实例
  const p = Promise.resolve('hh')
  // 没有提供处理程序，会包装p的值，幂等性传递
  const p2 = p.then()
  // 有返回值，则会用Promise.resolve()包装来生成新期约, 没有显示返回，则返回undefined
  const p3 = p.then((res) => {
    console.log('zzz', res);
    return Promise.resolve(5556)
  })
  console.log('zzzz', p2.then(res => console.log(res)), p3.then(res => console.log(res))); // false

  // 这个新期约实例基于onResovled处理程序的返回值构建。
  // 换句话说，该处理程序的返回值会通过Promise.resolve()包装来生成新期约。
  // 如果没有提供这个处理程序，则Promise.resolve()就会包装上一个期约解决之后的值。
  // 如果没有显式的返回语句，则Promise.resolve()会包装默认的返回值undefined。
})();