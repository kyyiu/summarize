/**
 * 
 * 两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
 * 说明: 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
 * 
 * 
 * 示例: 输入:
 * nums1 = [1,2,3,0,0,0], m = 3
 * nums2 = [2,5,6], n = 3
 * 输出: [1,2,2,3,5,6]
 */

function merge(nums1, m, nums2, n) {
    let i = m-1
    let j = n-1
    let k = m+n-1
    while(i>=0 && j>=0) {
        if (nums1[i] >= nums2[j]) {
            nums1[k] = nums1[i]
            i--
        } else {
            nums1[k] = nums2[j]
            j--
        }
        k--
    }
    while(j>=0) {
        nums1[k] = nums2[j]
        k--
        j--
    }
}

// 特殊解法，由于js对象具有排序属性的特性(下标类会自动排序比如1，2，3)， 其他的会根据赋值时间进行排序
// 所以可以得到以下方法

function myForEach(obj, arr) {
    for(const i in nums1) {
        const num = nums1[i]
        if (!obj[num]) {
            obj[num] = []
        }
        obj[num].push(num)
    }
}

function special(nums1, m, nums2, n) {
    const obj = {}
    myForEach(obj, nums1)
    myForEach(obj, nums2)
    return Object.values(obj).reduce((val, item) => [...val, ...item], [])
    // 或者
    return Object.values(obj).flat(Infinity)
}