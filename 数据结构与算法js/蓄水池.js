/**
 * 
 * 解决采样问题, 核心是需要保证每个样本的概率都相同
 * 比如:
 * 一个数据流，这个数据流的长度很大或者未知。并且对该数据流中数据只能访问一次。请写出一个随机选择算法，使得数据流中所有数据被选中的概率相等。
 */

/**
 * 步骤
 *  假设需要采样的数量为 k。
 *  首先构建一个可容纳 k 个元素的数组，将序列的前 k 个元素放入数组中。
 *  然后对于第 j （j > k）个元素开始，以 k / j 的概率来决定该元素是否被替换到数组中（数组中的 k 个元素被替换的概率是相同的）。 当遍历完所有元素之后，数组中剩下的元素即为所需采取的样本。
 */
/**
 * 证明
 * k为样本大小，n为数据规模大小
 * 对于前k个数，在k步之前选中概率为1
 * 在k+1步及之后时， 第k+1个数被选中并替换原始选中的概率 = k+1被选中的概率 * k中被替换的概率
 * (k+1不被选中的概率为1/k+1, 所以k+1被选中的概率为k/k+1, k中被替换的概率为1/k)
 * (p = k/k+1 * 1/k)
 * 那么k中不被替换的概率为1-p = k/k+1
 * 依次类推
 * 不被k+2替换的概率为 (1 - k/k+2 * 1/k = k+1/k+2)
 * 。。。
 * 那么原始k数组的元素保留的概率 = 选中概率*不被替换的概率
 * p = (1 * (k/k+1) * (k+1/k+2) *...* (n-2/n-1)*(n-1/n)) = k/n
 * 对于 x(x > k)的数,被选中的概率为 k/x, 不被 x + 1 替换的概率为(1 - k/(x+1) * 1/k = x/(x+1))
 * x被保留的概率= k/x * x/(x+1)
 * 依次类推
 * x被保留的概率 = k/x * x/x+1 * x+1/x+2 * ... * n-1/n = k/n
 * 如此就保证了每个数据采集的概率相同都为k/n 
 */

function reservoirSampling() {
  const sampleSize = 1
  const pool = []
  const dataSize = 10
  const res = []
  // 初始化数据
  for (let i = 0; i < dataSize; i++) {
    pool.push(i)
  }
  // 小于样本大小直接放入采样中
  for (let i = 0; i < sampleSize; i++) {
    res[i] = i
  }
  // 模拟后续进入的数据处理
  // k+1开始概率抽样
  for (let i = sampleSize; i < dataSize; i++) {
    const random = parseInt(Math.random() * (i+1))
    // k/x+1选中
    if (random < sampleSize) {
      res[random] = pool[i]
    }
  }

  return res
}

console.log(reservoirSampling());