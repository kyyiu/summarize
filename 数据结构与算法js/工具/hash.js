/**
 * 认识哈希函数，哈希表
 * 1. 输入域无穷，输出有限(md5->0~2^64-1, shal->0~2^128-1)
 * 2. 输入输出相同
 * 3. 逼近极限，会扩容，扩容代价nlogn，其中n为数据重新挂载，logn为扩容次数，单次扩容代价为logn
 */

/**
 * 布隆过滤器
 * 只有增加和查找，但是会有失误率，比如黑名单查询
 * 需要基础知识位图
 * 公式，n为样本量，p为失误率
 * m（需要多少bit内存） = -（( n*ln(p) ) / (ln(2)^2 )）
 * k (需要多少个哈希函数) = (ln(2) * (m/n)) 约等于 0.7 * (m/n)
 * 上面结果都向上取整
 * 真实失误率p = (1 - e^(- ((n * k真) / m真)  ))
 * 
 */


/**
 * 
 * 一致性哈希
 */