/**
 * 主要有
 * 红黑树
 * AVL
 * SB树
 * 跳表（skiplist
 */

/**
 * 平衡操作
 * 左旋，头节点到左孩子的位置
 * 右旋，头节点到右孩子的位置
 * 
 * 平衡时机
 * 1.加入节点时
 * 从加入节点开始往上，每个节点都检查平衡性
 * 2. 删除节点（除了同时存在左右孩子时）
 * 从删除节点开始往上，每个节点都检查平衡性
 * 3. 删除节点（有左右孩子）
 * 替换头节点后，从删除节点的位置往上检查
 * 
 * 平衡性被破坏的情况
 * 1. 左孩子左边过长，解决--左旋
 * 2. 右孩子右边过长，解决--右旋
 * 3. 左孩子的右孩子过长，解决--想办法把左孩子的右孩子旋到根节点
 * 4. 右孩子的左孩子过长, 解决--想办法把右孩子的左孩子旋到根节点
 */

function rebanlance(node) {
    while(node !== null) {
      const parent = node.parent
      let leftHeight = (node.left === null) ? -1 : (node.left).height;
      let rightHEigth = (node.right === null) ? -1 : (node.right).height;
      if (nodeBalance === 2) {
          if (node.right.right !== null) {
              node = avlRotateLeft(node)
              break;
          } else {
              node = doubleRotateRightLeft(node);
              break;
          }
      } else if (nodeBalance === -2) {
          if (node.left.left !== null) {
              node = avlRotateRight(node);
              break;
          } else {
              node = doubleRotateLeftRight(node);
              break;
          }
      } else {
          updateHeight(node)
      }
    }
}