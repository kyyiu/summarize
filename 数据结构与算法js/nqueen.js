function start(n) {
    if (n < 1) {
        return 0
    }
    // res[i] 第i行的皇后，放在第几列
    const res = []
    return foo(0, res, n)
}

function foo(i, arr, n) {
    if (i === n) {
        return 1
    }
    let count = 0
    for (let j = 0; j < n; j++) {
        // 当前i行的皇后，放在j列，会不会和之前的（0~i-1）的皇后共行共列共斜线
        // 是，则无效
        if (isValid(arr, i, j)) {
            arr[i] = j
            count += foo(i+1, arr, n)
        }
    }
    return count
}

function isValid(arr, i, j) {
    // 前k行的皇后
    for (let k = 0; k < i; k++) {
        if(j==arr[k] || Math.abs(arr[k] -j) === Math.abs(i-k)) {
            return false
        }
        
    }
    return true
}

console.log(start(4))