/**
 *  reduce() 过程中的单个步骤来说，每一次回调执行，都会吃进 2 个参数，吐出 1 个结果。
 *  我们可以把每一次的调用看做是把 2 个入参被【组合】进了 callback 函数里，最后转化出 1 个出参的过程。
 *  我们把数组中的 n 个元素看做 n 个参数，那么 reduce() 的过程，就是一个把 n 个参数逐步【组合】到一起，最终吐出 1 个结果的过程。
 */

// reduce 实现 map
function handle(previousValue, currentValue) {
  // previousValue 是一个数组
  previousValue.push(currentValue + 1)
  return previousValue
}



const arr = [1,2,3]
const res = arr.reduce(handle, [])
console.log(res);


/**
 * pipe实现
 */
function pipe(...funcs) {
  // reduce 每次会传入当前值和数组最左的一个元素
  function cb(val, func) {
    // 返回值将作为下一次reduce的初始值
    return func(val)
  }
  return function(init) {
    return funcs.reduce(cb, init)
  }
}

/**  
 * compose实现
*/
function compose(...funcs) {
  function cb(val, func) {
    return func(val)
  }
  return function(init) {
    return funcs.reduceRight(cb, init)
  }
}

function foo1(val) {
  return val + 1
}

function foo2(val) {
  return val + 2
}

const execPipe = pipe(foo1, foo2)
const execCompose = compose(foo1, foo2)
console.log(execPipe(0), execCompose(0))


function wrapFunc(func, fixedValue) {
  // 包装函数的目标输出是一个新的函数
  function wrappedFunc(input){
    // 这个函数会固定 fixedValue，然后把 input 作为动态参数读取
    const newFunc = func(input, fixedValue)
    return newFunc
  }
  return wrappedFunc
}

function multiply(a, b) {
  return a*b
}

const multiply3 = wrapFunc(multiply, 3)

// 输出6
console.log(multiply3(2));






柯里化解决组合链的元数问题
接下来我们就借助一个函数元数五花八门的组合链，来验证一下通用 curry 函数的效果。

首先定义一系列元数不等、且不符合一元要求的算术函数：

function add(a, b) {
  return a + b
}

function multiply(a, b, c) {
  return a*b*c
}

function addMore(a, b, c, d) {
  return a+b+c+d
}

function divide(a, b) {
  return a/b
}
此时若像下面这样直接把四个函数塞进 pipe 中去，必定是会倒沫子的：

const compute = pipe(add, multiply, addMore, divide)
我们需要首先对四个函数分别作“一元化”处理。

这“一元化”处理的第一步，就是借助 curry 函数把它们各自的传参方式重构掉：

const curriedAdd = curry(add)
const curriedMultiply = curry(multiply)
const curriedAddMore = curry(addMore)
const curriedDivide = curry(divide)
然后对这些函数逐个传参，传至每个函数只剩下一个待传参数为止。这样，我们就得到了一堆一元函数：

const compute = pipe(
  curriedAdd(1), 
  curriedMultiply(2)(3), 
  curriedAddMore(1)(2)(3), 
  curriedDivide(300)
)