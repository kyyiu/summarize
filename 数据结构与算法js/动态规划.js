/**
 * 1. 尝试所有方式
 * 2. 记忆搜索
 * 3. 可以把某些问题抽象为严格表结构
 */

/**
 * 练习1
 * 一个1~n的正数组
 * 一个s（1~n
 * 一个e（1~n
 * 一个k （必须走k步
 * 每次都只能走一步从s到e走k步的方法数
 */

function p1() {
  const arr = [1, 2, 3, 4, 5];
  const k = 4;

  /**
   *
   * @param {*} n 一共1~n个位置
   * @param {*} e 终点位置
   * @param {*} r 剩余步数 可变
   * @param {*} c 当前位置 可变
   * @returns 返回方法数
   */
  // 尝试版本
  function foo(n, e, r, c) {
    // 最终结果情况
    if (r === 0) {
      return c === e ? 1 : 0;
    }
    // 左边界情况
    if (c === 1) {
      return foo(n, e, r - 1, 2);
    }
    // 右边界情况
    if (c === n) {
      return foo(n, e, r - 1, n - 1);
    }

    return foo(n, e, r - 1, c - 1) + foo(n, e, r - 1, c + 1);
  }

  // 记忆搜索优化
  // 因为有两个可变参数，用个二维数组保存
  const memo = Array(k + 1)
    .fill(0)
    .map((e) => []);

  function foo2(n, e, r, c) {
    // 记忆搜索
    if (typeof memo[r][c] !== "undefined") {
      return memo[r][c];
    }

    // 最终结果情况
    if (r === 0) {
      memo[r][c] = c === e ? 1 : 0;
      return memo[r][c];
    }
    // 左边界情况
    if (c === 1) {
      memo[r][c] = foo2(n, e, r - 1, 2);
      return memo[r][c];
    } else if (c === n) {
      memo[r][c] = foo2(n, e, r - 1, n - 1);
      return memo[r][c];
    } else {
      memo[r][c] = foo2(n, e, r - 1, c - 1) + foo2(n, e, r - 1, c + 1);
      return memo[r][c];
    }
  }

  // 根据递归结果，生成表结构，完成动态规划
  function foo3(n, e, r, c) {
    n = n.length + 1
    const dp = Array(r+1).fill(0).map(e=> Array(n).fill(0))
    // 剩余步骤为0，并且在目标位置
    dp[0][e] = 1
    // 填表dp, 因为是1~n，所以第0列无效
    for(let row = 1; row<=r; row++) {
      for(let col = 1; col<n; col++) {
        if (col === 1) {
          dp[row][col] = dp[row-1][2]
          
        } else if (col === n-1) {
          dp[row][col] = dp[row-1][n-2]
          console.log(dp[row][col]);
        } else {
          // console.log('vv',dp[row-1][col-1], dp[row-1][col+1], dp[row-1][col-1]);
          dp[row][col] = dp[row-1][col-1] + dp[row-1][col+1]
        }
      }
    }
    return dp[r][c]
  }
  
  console.log(foo3(arr, 4, k, 2));
}

p1()
