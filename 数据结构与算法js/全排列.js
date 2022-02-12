/**
 * 
 * @param {*} str 
 * @param {*} i 
 * @param {*} res
 * str[i...]范围上，所有的字符，都可以放到i位置上后续去试
 * str[0...i-1]范围上，是之前的选择
 * 把所有字符串形成的全排列放到都res中 
 * 
 * 
* 例如['a','b','a']原始数据
* 先通过第一轮循环完成原始数据的排列,即i=j的时候的情况
* 之后return进入j>i的情况下的循环,得到子序列的排列
* 工程大概如下
* [['a'],['b'], ['a']] 第一轮到底，让每个在自己的位置上得到第一个排列
* j>i时
* [['a'],['b','a']] 返回后在['b','a']进行全排列,相当于确定第一个位置是a的情况下有哪些组合
* 上一轮结束后回到['a','b','a']
* 第一个a和后面的交换位置
* 上面每个子序列的交换过程通过rLis记录是否在该位置使用过这个字母如['a','b','a']这个序列
* 第一个是a,得到rLis【0】为假,交换0，0的字母向下处理，并把rLis【0】记录为真
* j>i时
* 第二个是brLis【1】为假，交换0，1的字母，向下处理并把rLis【1】记录为真
* 第三个是a得到rLis【0】为假,不用交换，因为交换后也是得到一样的序列然后向下处理

 */
function all(str, i, res) {
    if (i===str.length) {
        
        res.push(str.join(''))
    }

    const wordList = []
    for(let j=i;j<str.length;j++) {
        // 没有用过的字符
        if(!wordList[str[j].charCodeAt() - 97]) {
            // 记录使用的
            wordList[str[j].charCodeAt() - 97] = true
            swap(str, i, j) //交换str的i和j的位置
            all(str, i+1, res)
            swap(str, i, j) // 利用系统栈复原str
        }
    }
}

function swap(t,a, b){
    let tmp = t[a]
    t[a] = t[b]
    t[b] = tmp
}
const r = []

const s = ['a','b','c']

all(s, 0, r)
console.log(r)