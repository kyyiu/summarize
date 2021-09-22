// 某个数现在处在idx位置，往上继续移动,比较生成大根堆
function heapInsert(arr, idx) {
	// >>0是取整
	let fatherIdx = (idx-1)/2>>0
	// 当前的数大于父位置的数，则两者交换位置，idx来到父位置，继续
	// 直到index位置的数不再比父位置大，或者来到头位置即idx=0时
	while(arr[idx] > arr[fatherIdx]) {
		swap(arr, idx, fatherIdx)
		idx = fatherIdx
		fatherIdx = (idx-1)/2>>0
	}
}

// 从idx位置往下找更大的值生成当前idx为根的大根堆
function heapify(arr, idx, heapSize) {
	// idx位置的左孩子坐标 n*2 + 1, 右孩子n*2+2
	let left = idx*2 + 1 
	// heapSize 堆的大小， 我们要的堆的大小,比如 [1,2,3,4,5] 我们的heapsize取3就是用[1,2,3]当成一个堆
	// left < heapSize 判断有没有左孩子
	while (left < heapSize) {
		// 有右孩子，并且右孩子的值大于左孩子，返回右孩子的下标，不然返回左孩子的下标
		let biggerIdx = left+1 < heapSize && arr[left+1] > arr[left] ? left+1 : left
		// 父节点和孩子的值比较，如果孩子的值大于父节点，返回孩子的下标，否则返回当前节点的下标
		biggerIdx = arr[biggerIdx] > arr[idx] ? biggerIdx : idx
		// 孩子里面没有找到更大的值，退出
		if (biggerIdx === idx) {
			break
		}
		// 有更大的值，交换两个
		swap(arr, biggerIdx, idx)
		// 把小的值下标当作当前的下标，重复上述步骤
		idx = biggerIdx
		left = idx*2 + 1 
	}
}

function heapSort(arr) {
	if (arr === null || arr.length<2) {
		return
	}
	
	// 生成大根堆
	// 方案一： 把数组中的值当作一个一个输入的，生成大根堆
	for(let i = 0; i < arr.length; i++) {
		heapInsert(arr, i)
	}
	
	// 方案二：把数组当作已经是一个堆了，从子节点开始网上生成大根堆
	// for(let i = arr.length-1; i >= 0; i--) {
	// 	heapify(arr, i, arr.length)
	// }
	
	let heapSize = arr.length
	// 经过上面的步骤生成了大根堆，0位置是最大值
	// 把大根堆的最大值放到最后，并缩减堆长度
	// 比如生成的大根堆[5,4,3,2,1,0,0],heapSize是数组长度表示把[5,4,3,2,1,0,0]当成一个堆
	// 把最大值放到最后，并缩减堆长度，此时为[0,4,3,2,1,0,5]，heapSize是6表示把[0,4,3,2,1,0]当作一个堆
	swap(arr, 0, --heapSize)
	while(heapSize>0) {
		// 在0位置往下搜寻更大的值，生成新的大根堆
		heapify(arr, 0, heapSize)
		// 继续把大根堆的最大值放到最后，并缩减堆长度
		swap(arr, 0, --heapSize)
		// 重复上面步骤，直到堆里面没有值
	}
}

function swap(arr, a, b) {
	const tmp = arr[a]
	arr[a] = arr[b]
	arr[b] = tmp
}

// 示例
const arr = [68,66,12,45,68,2,7,99,2]
heapSort(arr)
console.log(arr)