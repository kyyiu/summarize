function quickSort(arr) {
	if (!arr || arr.length<2) {
		return
	}
	quickSortMain(arr, 0, arr.length-1)
}

function quickSortMain(arr, L, R) {
	if (L<R) {
		// 随机取个值当作中间值指标，并和最后一个值交换位置
		swap(arr, L + ((Math.random()*(R-L+1))>>0), R)
		// [[小于中间值序列],[等于中间值序列],[大于中间值序列]]
		const border = midBorder(arr, L, R)
		quickSortMain(arr, L, border[0] - 1)
		quickSortMain(arr, border[1] + 1, R)
	}
}

function midBorder(arr, L, R) {
	let small = L - 1  // 小于中间值的序列右边界，下面简称右边界
	let big = R // 大于中间值的序列左边界，下面简称左边界
	// L是当前位置，如果没有和大于中间值的序列边界重合继续分类
	while ( L < big ) {
		// 当前值小于中间值，划分到小于序列，操作就是交换两者位置，并且右边界右移一位，当前位置右移一位
		if (arr[L] < arr[R]) {
			swap(arr, ++small, L++)
		} else if (arr[L] > arr[R]) { // 当前值大于中间值，划分到大于序列，左边界左移一位，当前位置不动，因为右边的值是未访问过的，等下次循环再次判断
			swap(arr, --big, L)
		} else { // 当前值等于中间值，继续往后看
			L++
		}
	}
	// 把中间值换回中间相等序列
	// 当循环结束后，L 和 big相等，这个位置的值肯定是大于等于中间值的，直接交换即可
	swap(arr, big, R)
	// 返回大于，小于，中间值的序列的左右边界下标
	return [small+1, big]
}

function swap(arr, a, b) {
	let tmp = arr[a]
	arr[a] = arr[b]
	arr[b] = tmp
	
	// 交换两个数也可以使用异或运算,从而不用新建一个tmp变量
	// 异或：自己异或自己为0，任何数和0异或都为自己
	// a = x
	// b = y
	// a = a ^ b // a此时为 x^y
	// b = a ^ b // b此时为 x^y^y = x ^ 0 = x
	// a = a ^ b // a此时为 x^y^x = y ^ 0 = y
	// 但是前提是a，和b在内存中是两个独立的空间，不然会把自己变成0
	// 所以保险的方式还是上面的交换方式
}


const arr = [6,5,3]
quickSort(arr)
console.log(arr)