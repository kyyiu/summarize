/**
 * 解决的问题
 * 找到一个数左边和右边离他最近比他大（小)，在on内解决
 * 
 * 单调递增栈（如果有重复的值，则用一种结构把重复的值压在一起如数组或者链表)
 * 从左往右,
 * 如果栈为空，直接压入值(或者下标，推荐下标，因为信息更多)
 * 如果不为空，则判断当前的值和栈顶的值，当前大于，直接压入
 * 如果小于，弹出直到栈顶小于要压入的值或者为空，再压入
 * 最后看栈里面有没有剩余，有的话依此弹出
 */
 function MonotonicStack() {
    this.mainStack = []
  
  }
  
  MonotonicStack.prototype.getPeak = function() {
    const len = this.mainStack.length
    return this.mainStack[len-1]
  }
  
  MonotonicStack.prototype.outPeak = function() {
    return this.mainStack.pop()
  }
  
  MonotonicStack.prototype.pushItem = function(item) {
    this.mainStack.push(item)
  }
  
  MonotonicStack.prototype.isEmpty = function() {
    return this.mainStack.length === 0
  }
  
  const arr = [5,4,1,2, 2,3]
  const m = new MonotonicStack()
  // 只考虑无重复值情况
  // for(const i in arr) {
  //   if (m.isEmpty()) {
  //     m.pushItem(i)
  //     continue
  //   }
  //   // 保持递减性arr[m.getPeak()] < arr[i], 递增性arr[m.getPeak()] > arr[i]
  //   while(!m.isEmpty() && (arr[m.getPeak()] < arr[i])) {
  //     const prePeak = m.outPeak()
  //     const cloestLeftBigger =  m.isEmpty() ? null : m.getPeak()
  //     console.log(`arr${prePeak}位置右边最近比它大的是arr${i}位置的，左边是${cloestLeftBigger}位置上的`);
  //   }
  //   m.pushItem(i)
  // }
  
  // 有重复值
  for(const i in arr) {
    if (m.isEmpty()) {
      const t = []
      t.push(i)
      m.pushItem(t)
      continue
    }
    let t = m.outPeak()
  
    // 保持递减性arr[m.getPeak()] < arr[i], 递增性arr[m.getPeak()] > arr[i]
    // 递减可以找某个数左右最近比它大的
    /**
     * 
     * 因为出现这种情况它需要弹出
     * 3
     *  2     
     *    1   1
     *      o
     */
    // 递增找比它小的
    /**
     * 1      
     *  2   2
     *    3
     */
    while((!m.isEmpty() || t.length) && (arr[t[t.length-1]] < arr[i])) {
      const prePeak = t.pop()
      const cloestLeftBigger =  m.isEmpty() ? null : m.getPeak()[m.getPeak().length-1]
      console.log(`arr${prePeak}位置右边最近比它大的是arr${i}位置的，左边是${cloestLeftBigger}位置上的`);
      if (!t.length && !m.isEmpty()) {
        t = m.outPeak()
      }
    }
    if (t.length) {
      m.pushItem(t)
    }
    if (arr[t[t.length-1]] === arr[i]) {
      m.getPeak().push(i)
    } else {
      m.pushItem([i])
    }
  }
  console.log(m.mainStack)