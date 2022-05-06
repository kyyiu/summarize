/**
 * Manacher解决的问题
 * 字符串中，最长回文子串的长度
 * 在ON完成
 * 两大类拓扑关系
 * 1 -- () i // i在区间外
 * 2.1-- [..(i^),..x..,(i)..] // i在x为中心的回文区间内，且以x为对称的i^的回文长度在x回文长度内
 * 2.2--[(i^),...x...,(i)] // i和i^刚好在x对称的边界
 * 2.3--(..[i^),..x..,(i)] // i^有超过了左边界的回文区间，i贴在右边界(一定，因为i^左边等于i^右边， i^右边等于i左边，i^左边在外面所以i^左边不等于i右边, 如果相等则会进入2.1或者2.2的情况)
 */

// 把121 变成 #1#2#1#
// #可以换成容易字符，因为对比时总是实的和实的比，虚的和虚的比
function handleRawStr(str) {
    let len = str.length * 2 + 1
    let res = []
    let idx = 0
    for (let i =0; i != len; i++) {
        res[i] = (i & 1) == 0 ? '#' : str[idx++]
    }
    return res
}


function manacher(str) {
    const getStr = handleRawStr(str)
    console.log(getStr)
    const rArr = [] // 回文半径数组
    let C = -1 // 中心
    let R = -1 // 回文右边界再右边的一个位置,有效区是R-1
    let max = Number.MIN_VALUE
    for (let i=0; i != getStr.length; i++) {//对每个位置求回文半径
        // i至少的回文区域，给rArr[i]
        // R > i 在回文区域内, i的回文半径是右边界到自己的位置，和i^位置回文边界中小的那一个
        // 不然是1为自身
        rArr[i] = R > i ? Math.min(rArr[2 * C - i], R - i) : 1
        while ( ((i + rArr[i]) < getStr.length) && ((i - rArr[i]) > -1)) {
            if (getStr[i + rArr[i]] === getStr[i - rArr[i]]) {
                rArr[i]++
            } else {
                break
            }
        }

        if ((i + rArr[i]) > R) {
            R = i + rArr[i]
            C = i
        }
        max = Math.max(max, rArr[i])
    }
    // 回文半径与真实长度有真n-1的关系,#1#2#1#, 2#1# - 1 为3
    return max - 1
}

console.log(manacher('121'))