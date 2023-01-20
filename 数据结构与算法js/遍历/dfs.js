// 深度优先遍历，基于栈或者递归
// 递归调用的函数执行过程本身就是一个栈，叫做函数调用栈，入栈规则为函数调用，出栈规则为函数执行完毕。

// 全排列
const a = [1,2,3,]
function foo(arr) {
    const used = {}
    const res = []
    const cur = []
    const len = arr.length
    
    function dfs(idx) {
        if (idx === len) {
            res.push(cur.slice())
            return
        }    
        for (let i =0; i<len;i++) {
            if (!used[arr[i]]) {
                used[arr[i]] = 1
                cur.push(arr[i])
                dfs(idx+1)
                cur.pop()
                used[arr[i]] = 0
            }
        }
    }
    dfs(0)
    return res
}


// 组合
function foo2(arr) {
    const res = []
    const len = arr.length
    const cur = []
    dfs(0)
    function dfs(idx) {
        res.push(cur.slice())
        for(let i = idx; i<len;i++) {
            cur.push(arr[i])
            dfs(i+1)
            cur.pop()
        }
    }
    return res
}

// console.log(foo(a));
console.log(foo2(a))



// 过程抽象的伪代码
function xxx(入参) {
    前期的变量定义、缓存等准备工作 
    
    // 定义路径栈
    const path = []
    
    // 进入 dfs
    dfs(起点) 
    
    // 定义 dfs
    dfs(递归参数) {
      if(到达了递归边界) {
        结合题意处理边界逻辑，往往和 path 内容有关
        return   
      }
      
      // 注意这里也可能不是 for，视题意决定
      for(遍历坑位的可选值) {
        path.push(当前选中值)
        处理坑位本身的相关逻辑
        path.pop()
      }
    }
  }