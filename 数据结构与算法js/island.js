/**
 * 岛问题
 * 矩阵中一片1连接（上下左右）的部分为1个岛
 */

 const mat = [
    [0,0,1,0,1,0],
    [1,1,1,0,1,0],
    [1,0,0,1,0,0]
]

function main(m){
    let res = 0
    mat.forEach((e, row) => {
        for(let col in e) {
            if (m[row][col] === 1) {
                res++
                infect(m, row, col, m.length, m[row].length)
            }
        }
    })
    return res
}

function infect(m, row, col, maxRow, maxCol) {
    if (
        row<0 || row>=maxRow
        ||
        col<0 || col>=maxCol
        ||
        m[row][col] !== 1 
    ) {
        return
    }
    m[row][col] = 2
    infect(m, row+1, col, maxRow, maxCol)
    infect(m, row-1, col, maxRow, maxCol)
    infect(m, row, col+1, maxRow, maxCol)
    infect(m, row, col-1, maxRow, maxCol)
}

console.log( main(mat) )


/**
 * 并查集（组合和查找都是接近O1的结构）
 * 例子
 * 假设开始有三个集合
 * 让它们自己指向自己
 * 组合时让他们挂载
 * 比如a和b不是一个集合（因为b最后找到b，a最后找到a），把b挂在a上
 * a<-a<-b
 * 此时b最后会找到a，b最后会找到a，此时这两个是一个集合
 */


function Ele(val) {
    this.val = val
}

function UnionFindSet(list) {
    this.elementMap = new Map()
    this.fatherMap = new Map() // key为某个元素 value为 这个元素的父
    this.sizeMap = new Map() // key为某个集合的代表元素 value为 该集合的大小

    list.forEach((e, idx) => {
        let ele = new Ele(e)
        // 初始化,所有元素各自分开
        this.elementMap.set(e, ele) 
        this.fatherMap.set(ele, ele)
        this.sizeMap.set(ele, 1)
    })
}

// 找到最大的父节点, 只要和ele不同就一直往上找，最后返回代表元素
UnionFindSet.prototype.findHead = function(element) {
    // 查找栈，准备扁平化优化
    let findPathStack = []
    // 
    while (this.fatherMap.get(element) !== element) {
        findPathStack.push(element)
        element = this.fatherMap.get(element)
    }

    while(findPathStack.length) {
        this.fatherMap.set(findPathStack.pop(), element)
    }
    return element
}


// 判断a，b两个集合是不是同一个
UnionFindSet.prototype.isSameSet = function(a, b) {
    if(this.elementMap.has(a) && this.elementMap.has(b)) {
        return this.findHead(this.elementMap.get(a)) === this.findHead(this.elementMap.get(b))
    }
    return false
}

// 合并两个集合
UnionFindSet.prototype.union = function(a, b)  {
    if (this.elementMap.has(a) && this.elementMap.has(b)) {
        aF = this.findHead(this.elementMap.get(a))
        bF = this.findHead(this.elementMap.get(a))

        if(aF !== bF) {
            let big = this.sizeMap.get(aF) >= this.sizeMap.get(bF) ? aF : bF
            let small = big === aF ? bF : aF
            this.fatherMap.set(small, big)
            this.sizeMap.set(big, this.sizeMap.get(aF) + this.sizeMap.get(bF))
            this.sizeMap.delete(small)
        }
    }
}


/**
 * 并行算法解决岛问题
 * 
 * 切分岛（假设两个块)
 * 每个部分单独执行感染过程
 * 记录边界消息生成并查集，相加岛数量
 * 结束后合并边界信息
 * 左右边界都是相连的进行讨论
 * 如果不在一个集合中的，岛数量减一,合并两个边界集合
 */