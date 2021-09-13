function mergeSort(arr, L, R) {
	console.log(L, R)
	if (L===R) {
		return
	}
	// 移位运算符优先级小于+
	const mid = L+((R-L)>>1)
	mergeSort(arr, L, mid)
	mergeSort(arr,mid+1,R)
	merge(arr, L, mid, R)
}

function merge(arr, L, M, R) {
	let tmp = []
	let current = 0
	let p1 = L
	let p2 = M + 1
	// 先把一边完成复制
	while(p1<=M && p2<=R) {
		// 返回小的
		tmp[current++] = arr[p1] <= arr[p2] ? arr[p1++] : arr[p2++]
	}
	// 把剩下的直接复制
	while(p1<=M) {
		tmp[current++] = arr[p1++]
	}
	while(p2<=R){
		tmp[current++] = arr[p2++]
	}
	// 排好序的值更新到arr中
	for(let i=0;i<tmp.length;i++){
		arr[L+i] = tmp[i]
	}
}

const arr = [6,5,4,5,6]
mergeSort(arr, 0, arr.length-1)
console.log(arr)