function hano(n) {
    if (n > 0) {
        foo(n, '左', '右', '中')
    }
}

// 1~i圆盘目标是start-》end，other是另外一个
// 1.1~i-1从start到other上去
// 2.第i个从start移到end上去，此时最大的盘已经在目的地了，相当于把第三根柱子当作开始位置继续移动剩下的盘
// 3.1-i-1从other移动到end上去
function foo(i, start, end, other) {
    // 步骤2
    if(i===1) {
        console.log(`移动 1 from ${start} to ${end}`)
        return
    }
    // 步骤1
    foo(i-1, start, other, end)
    console.log(`move ${i} from ${start} to ${end}`)
    // 步骤3
    foo(i-1, other, end, start)
}

hano(2)