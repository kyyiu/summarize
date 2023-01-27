/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    function quick(arr, left, right) {
        if (arr.length<=1) {
            return arr
        }
        const last = position(arr, left, right)
        if (left < last-1) {
            quick(arr, left, last-1)
        }
        if (right > last) {
            quick(arr, last, right)
        }
        return arr
    }

    function position(arr, left, right) {
        const piv = arr[Math.floor(left + (right-left)/2)]
        let i = left
        let j = right
        while(i<=j) {
            while(arr[i] < piv) {
                i++
            }
            while(arr[j] > piv) {
                j--
            }
            if (i<=j) {
                [arr[i],arr[j]] = [arr[j], arr[i]]
                i++
                j--
            }
        }
        return i
    }

    return quick(nums, 0, nums.length-1)



    // if (nums.length<=1) {
    //     return nums
    // }
    // const piv = Math.floor(nums.length/2)
    // const sign = nums.splice(piv, 1).pop()
    // const left = []
    // const right = []
    // for (const i of nums) {
    //     if (i < sign) {
    //         left.push(i)
    //     } else {
    //         right.push(i)
    //     }
    // }
    // return sortArray(left).concat([sign], sortArray(right))
};