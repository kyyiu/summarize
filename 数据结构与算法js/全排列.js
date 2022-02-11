/**
 * 
 * @param {*} str 
 * @param {*} i 
 * @param {*} res
 * str[i...]范围上，所有的字符，都可以放到i位置上后续去试
 * str[0...i-1]范围上，是之前的选择
 * 把所有字符串形成的全排列放到都res中 
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