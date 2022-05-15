function WindowMax() {
    this.arr = []
    this.L = -1
    this.R = 0
    this.queue = []

    // L = -1
    // R = 0
    // 代表 arr [-1, 1)
    // [3,2,1,4]
    //[-1, 1) arr[0]
    // [-1, 2] arr[0, 1]
}


WindowMax.prototype.addFromRight = function() {
    if(this.R === this.arr.length) {
        return;
    }
    while(this.queue.length && arr[this.queue[0]] <= this.arr[this.R]) {
        this.queue.pop()
    }
    this.queue.push(this.R)
    this.R++
}

WindowMax.prototype.removeFromLeft = function() {
    if (this.L >= this.R-1) {
        return
    }
    this.L++
    if (this.queue[0] === this.L) {
        this.queue.shift()
    }
}

WindowMax.prototype.getMax = function() {
    if(this.queue.length) {
        return this.arr[this.queue[0]]
    }
    return null
}