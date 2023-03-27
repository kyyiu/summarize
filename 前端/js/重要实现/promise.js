class MyPromise {
    constructor(func) {
        this.pending = 'pending'
        this.ok = 'fulfilled'
        this.not = 'rejected'
        // 通过状态判断处理结果
        this.state = this.pending
        this.result = ''
        this.err = ''
        // then方法回调存储
        this.resCbs = []
        this.rejCbs = []
        // 会执行传入的函数
        // 所以new Promise(()=>{})传入的函数是同步执行的
        // 传入的函数需要绑定this,不然会获取不到MyPromise上下文的内容
        func(this.res.bind(this), this.rej.bind(this))
    }
    res(data) {
        if(this.state === this.pending) {
            this.state = this.ok
            this.result = data
            this.resCbs.forEach(foo=>foo(data))
        }
    }
    rej(err) {
        if(this.state === this.pending) {
            this.state = this.not
            this.err = err
            this.rejCbs.forEach(foo=>foo(err))
        }
    }
    then(handleRes, handleRej) {
        // 实现then链式调用，再返回一个promise
        const thenPromise = new MyPromise((res, rej) => {
            if (this.state === this.ok) {
                catchErr(()=> {
                    const tmp = handleRes(this.result)
                    handleReturnPromise(thenPromise, tmp, res, rej)
                }, rej)
                
            }
            if (this.state === this.not) {
                catchErr(()=>{
                    const tmp = handleRej(this.err)
                    handleReturnPromise(thenPromise, tmp, res, rej)
                }, rej)
                
            }
            // 因为我们手写的promise，所以调用then的时候是同步的
            // 需要处理pending的情况
            if(this.state === this.pending) {
                this.resCbs.push((data)=>{
                    catchErr(()=>{
                        const tmp = handleRes(data)
                        handleReturnPromise(thenPromise, tmp, res, rej) 
                    }, rej)
                })
                this.rejCbs.push((err)=>{
                    catchErr(()=>{
                        const tmp = handleRej(err)
                        handleReturnPromise(thenPromise, tmp, res, rej)
                    }, rej)
                })
            }
        })
        return thenPromise
    }
}

function catchErr(cb, errCb) {
    try {
        cb()
    } catch (error) {
        errCb(error)
    }
}

function handleReturnPromise(thenPromise, promise, res, rej) {
    if (promise instanceof MyPromise) {
        // 返回值可能也是promise，递归处理
        promise.then(val => {
            handleReturnPromise(thenPromise, val, res, rej)
        }, rej)
    } else if (promise!==null && (['object', 'function'].includes(typeof promise))) {
        let then
        catchErr(()=>{
            then = promise.then
        }, rej)
        // then是函数表示promise有then方法
        if (typeof then === 'function') {
            catchErr(()=>{
                then.call(
                    promise, 
                    val=>handleReturnPromise(thenPromise, val, res, rej),
                    err=>rej(err)
                )
            }, rej)
        } else {
            res(promise)
        }
    } else {
        return res(promise)
    }
    
}
// 测试例子
const p = new MyPromise((res, rej) => {
    setTimeout(()=>{
        const isRes = Math.random() > 0.5
        console.log(isRes)
        if (isRes) {
            res('我是res')
        } else {
            rej('我是rej')
        }
    }, 1000)
}) 
p.then(data=> {
    console.log('执行res', data);
}, err=>{
    console.log('执行rej', err)
}).then(data=>{
    console.log('执行第二个res',data)
}, err=>{
    console.log('执行的是第二个rej', err)
})