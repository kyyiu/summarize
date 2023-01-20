/**
 * 题目描述：给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
 * 示例: 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 输出: [3,3,5,5,6,7]
 */

function maxSlidingWindow(nums, k) {
    const res = []
    const queue = []
    for (const i in nums) {
        // 维持一个递减性
        while(queue.length && nums[queue[queue.length-1]] < nums[i] ) {
            queue.pop()
        }
        queue.push(i)
        // 保证窗口在有效范围内
        while(queue.length && queue[0] <= i - k) {
            queue.shift()
        }
        if (i >= k-1) {
            res.push(nums[queue[0]])
        }
    }
    return res
}