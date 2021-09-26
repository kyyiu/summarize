function radixSort(arr) {
  if (arr===null || arr.length<2) {
    return
  }

  radixSortMain(arr, 0, arr.length-1, maxBitsLen(arr))
}

// 获取arr中的最大值的有多少十进制位数
function maxBitsLen(arr) {
  let max = Number.MAX_VALUE
  arr.forEach(element => {
    max = Math.max(max, element)
  });

  // 也可以使用如下方法获取最大值
  // Math.max 获取任意个值，返回其中的最大值
  // 1. Math.max(...arr)
  // 2/ Math.max(null, arr)
  let len = 0
  while (max > 0) {
    len++
    max /= 10
  }
  return len
}


/**
 * 
 * @param {*} num 原始值
 * @param {*} index 要取哪位数，0是个位，1是十位
 */
function getDigit(num, index) {
  // %10只会取到0~9如果一个数不做处理，就会取到那个数的个位
  // 一个数除以10相当于把十位换到个位上再余10，就是十位上的数
  // >>0取整
  return (num/Math.pow(10, index)%10)>>0
}


function radixSortMain(arr, L, R, len) {
  // 10为基底
  const radix = 10
  let i = 0
  let j = 0
  const bucket = []
  for (let t = 0; t < len; t++) { // len有多少就需要排序多少次，分别排序个位，十位，百位等，t控制的当前的位数是在个位还是十位...
    const count = Array(10).fill(0) // 统计某位上的数的个数，所以这个count数组是一个最大长度为10，统计0~9在某位出现次数的数组
    // 比如 个位上有3个1，则count[1]最后是3

    // 统计某位上，某个数出现的次数
    for(i = L; i<=R ; i++) {
			j = getDigit(arr[i], t) // t如果是0取出个位，是1取出十位
			count[j]++
		} 
    for(i = 1;i<radix;i++) {
			// 累加和,在某位上小于等于i的数有多少个
			// 累加和形成片区
      // 之后count[1]表示小于等于1的个数
      // count[2]表示小于等于2的个数
      // 但是由于某个数出现的次数是不变的，所以会生成一个数的片区
      // 比如[4,4,4,2,2,1,1]
      // 4出现了3次，2出现2次，1出现2次
      // count[4] 是3，count[2]是2，count[1] 是2
      // 通过这个循环后变成[0,2,4,4,7,7.7,7,...]
      // 这样下面的循环就可以生成一个0~2是1的片区，3~4是2的片区，5~7是4的片区
			count[i] = count[i] + count[i-1]
		}
    // 从右往左遍历，因为要符合上面形成的片区
    // 第一次即个位上的数可以从左往右，因为此时数组还是无序的
    // 但是后面就要从右往左了，因为是在个位上有序的
		for(i=R;i>=L;i--) {
			j=getDigit(arr[i], t) // 拿到当前的数
			bucket[count[j]-1] = arr[i] // 填到对应的位置
			count[j]--
		}
    // 经过上面两个循环就可以把bucket变成[1,1,2,2,4,4,4]
		// 上面执行完，相当于出桶了
		// 维持最新状态
    // console.log(bucket)
		for(i=L,j=0;i<=R;i++,j++) {
			arr[i] = bucket[j]
		}
  }
}

let arr = [9,8,5,4,2,1,3,3]

radixSort(arr)
console.log(arr)