const a = [1,2, 3]
const k = 2
function foo(arr, k) {
  let sum = 0
  for (const ele of arr) {
    sum += ele
  }
  if (sum % k) {
    return false
  }
  arr.sort((a,b)=>a-b)
  if (arr[arr.length-1] > sum/k) {
    return false
  }

  const dfs = (array, idx, sets, aim) => {
    if (idx < 0) {
      return true
    }

    for (let i = 0; i < sets.length; i++) {
      if (sets[i] + array[idx] > aim) {
        continue
      }
      if (i>0 && sets[i] === sets[i-1]) {
        continue
      }
      sets[i] += array[idx]
      if (dfs(array, idx - 1, sets, aim)) {
        return true
      }
      sets[i] -= arr[idx]
    }
    return false
  }
  return dfs (arr, arr.length-1, Array(k).fill(0), sum/k)
}

function foo2 (nums, k) {
  var canPartitionKSubsets = function(nums, k) {
    const dfs = (s, p) => {
        console.log(s, p, dp);
        if (s === 0) {
            return true;
        }
        if (!dp[s]) {
            return dp[s];
        }
        dp[s] = false;
        for (let i = 0; i < n; i++) {
            if (nums[i] + p > per) {
                break;
            }
            // i位置没有使用
            if (((s >> i) & 1) != 0) {
              // 标记使用了i位置，并加进p，同时(p + nums[i]) % per为0时意味着已经满足一个集合，同时生成了一个新的集合0
                if (dfs(s ^ (1 << i), (p + nums[i]) % per)) {
                    return true;
                }
            }
        }
        return false;
    };
    let all = 0
    for (const e of nums) {
      all+=e
    }
    if (all % k !== 0) {
        return false;
    }
    per = all / k;
    nums.sort((a, b) => a - b);
    n = nums.length;
    if (nums[n - 1] > per) {
        return false;
    }
    dp = new Array(1 << n).fill(true);
    console.log(dp, (1<<n)-1);
    return dfs((1 << n) - 1, 0);
  }
  return canPartitionKSubsets(nums, k)
}



function foo3(nums, k) {
  var canPartitionKSubsets = function(nums, k) {
    let all = 0
    for (const e of nums) {
      all+=e
    }
    if (all % k !== 0) {
        return false;
    }
    let per = all / k;
    nums.sort((a, b) => a - b);
    const n = nums.length;
    if (nums[n - 1] > per) {
        return false;
    }
    const dp = new Array(1 << n).fill(false);
    const curSum = new Array(1 << n).fill(0);
    dp[0] = true;
    for (let i = 0; i < 1 << n; i++) {
        if (!dp[i]) {
            continue;
        }
        for (let j = 0; j < n; j++) {
            if (curSum[i] + nums[j] > per) {
                break;
            }
            console.log(dp, curSum, (i >> j) & 1, i | (1 << j));
            if (((i >> j) & 1) == 0) {
                let next = i | (1 << j);
                if (!dp[next]) {
                    curSum[next] = (curSum[i] + nums[j]) % per;
                    dp[next] = true;
                }
            }
        }
    }
    return dp[(1 << n) - 1];
    abc bca
  }
  return canPartitionKSubsets(nums, k)
}

// console.log('剪枝回溯',foo(a, k));
// console.log('状态压缩回溯',foo2(a, k));
console.log('动态规划',foo3(a,k));