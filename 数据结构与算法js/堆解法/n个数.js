// 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
// 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    const heap = []
    let heapSize = 0
    function init() {
        for (let i = 0 ; i<k;i++) {
            insert(nums[i])
        }
    }

    function insert(val) {
        heap[heapSize] = val
        upHeap(0,heapSize)
        heapSize++
    }

    function upHeap(low, high) {
        let i = high
        // 父节点
        let j = Math.floor((i-1)/2)
        while (j >= low) {
            if (heap[i] < heap[j]) {
                [heap[j], heap[i]] = [heap[i], heap[j]]
                i = j
                j = Math.floor((j-1)/2)
            } else {
                break
            }
            
        }
    }

    function downHeap() {
        let i = 0
        let j = 1
        while (j <= k) {
            if (j+1<= k && heap[j+1] < heap[j] ) {
                j+=1
            }
            if (heap[i] > heap[j] ) {
                [heap[j], heap[i]] = [heap[i], heap[j]]
                i = j
                j = j*2+1
            } else {
                break
            }
            
        }
    }

    function update() {
        const len = nums.length
        for(let i = k; i<len; i++) {
            if (nums[i] > heap[0]) {
                heap[0] = nums[i]
                downHeap()
            }
        }
    }

    init()
    update()
    return heap[0]
};