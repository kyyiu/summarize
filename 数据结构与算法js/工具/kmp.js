/**
 * kmp解决的问题
 * 字符串str1和str2，str1是否包含str2，如果包含返回str2在str1中开始的位置
 * 暴力解法为O(M*N),M为str1长度，N为str2长度
 * 如何做到复杂度ON
 * 
 * 对str2求最大的前缀后后缀相同的数(小于str2长度)
 * 如abcab 最大情况下为ab和ab即最大为2
 * 
 * kmp过程
 * 例如:
 * str1: abcdeabcdf
 * str2: abcdeabcdg
 * 需要计算str2每个字符之前的最大前缀和后缀的匹配长度
 * i1从str1的a开始
 * i2从str2的a开始
 * 开始比对
 * i1和i2相等，同时后移一位
 * 直到i1到f，i2到g
 * 两个不同
 * g之前的最大匹配为4
 * i2回到e位置
 * 因为前缀和后缀是匹配相同的
 * 所以可以直接从e开始和f比较
 * 相当于abcdf。。。。和abcdeabcdg比较，但是跳过前面相同的部分
 * 即f。。。开始匹配是否存在eabcdg,因为f不等于e，所以i2继续前跳，直到能匹配出返回结果
 * 或者i2不能继续前跳，
 * 则i1后跳,
 * 循环这个步骤直到结束
 */

function getIndexOf(s1, s2) {
    if (!s1 || !s2 || s1.length < s2.length) {
        return -1
    }

    s1 = s1.split('')
    s2 = s2.split('')
    let i1 = i2 = 0
    let next = getNextArr(s2) // O(M)
    // O(N)
    while(i1 < s1.length && i2 < s2.length) {
        if(s1[i1] == s2[i2]) {
            i1++
            i2++
        } else if(next[i2]===-1) { // s2中比对的位置无法继续往前跳了
            i1++
        } else {
            i2 = next[i2]
        }
    }

    // i1越界或者i2越界
    return i2 === s2.length ? i1-i2 : -1
}

// 生成过程类似kmp过程中s2的前跳过程
function getNextArr(arr) {
    if(arr.length === 1) {
        return [-1]
    }
    const next = []
    next[0] = -1
    next[1] = 0
    // 上面两个人为规定
    let i = 2 // next数组开始的位置
    let cn = 0 // 拿哪个位置的字符和i-1的字符比较，同时也能得到前缀长度
    // 一开始是2位置和0位置开始比较
    while (i<next.length) {
        if(arr[i-1] == arr[cn]) {
            next[i++] = ++cn
        } else if(cn>0) {
            cn = next[cn]
        } else {
            next[i++] = 0
        }
    }
    return next
}

console.log(getIndexOf('abcdeabcdf', 'bcd'))