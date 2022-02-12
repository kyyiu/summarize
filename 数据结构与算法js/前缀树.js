function TreeNode() {
  this.path = 0
  this.end = 0
  this.next = {}
}

const root = new TreeNode()

const data = ['','a', 'ab', 'abc', 'bc', 'ccc']
function addNode(str) {
  let curNode = root
  curNode.path += 1
  const dataSlice = str.split('')
  for (const idx in dataSlice) {
    if(!curNode.next[dataSlice[idx]]) {
      curNode.next[dataSlice[idx]] = new TreeNode
    }
    curNode = curNode.next[dataSlice[idx]]
    curNode.path += 1
  }
  curNode.end += 1
}

for(const e in data) {
  addNode(data[e])
}

console.log(root)