/**
 * 求某个位置变成1后的最大岛屿面积
 */
const g = [[1, 0], [1, 1]]
// 位移，i和i+1的偏移即可组成 四个方向的位移
const d = [0, -1, 0, 1, 0];
const dfs = (grid, x, y, mark, t) => {
    let len = grid.length, res = 1
    mark[x][y] = t
    for (let i = 0; i < 4; i++) {
      let x1 = x+d[i], y1 = y+d[i+1]
      if (valid(len, x1, y1) && grid[x1][y1] === 1 && mark[x1][y1] === 0) {
        // 递归过程中同时把同一个岛屿上的进行标记
        res += dfs(grid, x1, y1, mark, t)
      }
    }
    return res
}

const valid = (n, x, y) => {
    return x >= 0 && x < n && y >= 0 && y < n;
};

function maxArea(g) {
  let res = 0
  const len = g.length
  const mark = Array(len).fill(0).map(() => Array(len).fill(0))
  const areaMap = new Map()
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      // 没标记的岛屿
      if (g[i][j] === 1 && mark[i][j] === 0) {
        const sign = i * len +j + 1
        areaMap.set(sign, dfs(g, i, j, mark, sign))
        res = Math.max(res, areaMap.get(sign))
      }
    }
  }

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (g[i][j] === 0) {
        let r = 1
        // 记录链接过的岛屿，避免重复链接
        const connected = new Set()
        for (let k = 0; k< 4; k++) {
          let x = i+d[k], y = j+d[k+1]
          if (!valid(len, x, y) || mark[x][y] === 0 || connected.has(mark[x][y])) {
            continue
          }
          r += areaMap.get(mark[x][y])
          connected.add(mark[x][y])
        }
        res = Math.max(res, r)
      }
    }
  }
  return res
}

console.log(maxArea(g));