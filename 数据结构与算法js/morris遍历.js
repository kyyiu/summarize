/**
 * 遍历二叉树的方式，时间On，额外空间O1
 * 通过原树中的大量空闲指针，达到节省空间的目的
 * 
 * 大概流程
 * 假设来到当前节点cur，开始时cur来到头节点位置
 * 1. 如果cur没有左孩子，cur向右移动(cur = cur.right)
 * 2. 如果cur有左孩子，找到左子树上最右的节点mostRight
 *  如果mostRight的右指针为空，让其指向cur
 *  然后cur向左移动(cur = cur.left)
 * 
 *  如果mostRight的右指针指向cur，让其指向null，
 *  然后cur 向右移动(cur = cur.right)
 * 3. cur为空时遍历停止
 */

function morris(head) {
    if (head === null) return

    let cur = head
    let mostRight = null
    while(cur !== null) {
        mostRight = cur.left // mostright是cur左孩子
        if(mostRight !== null) {// 有左子树
            while(mostRight.right !== null && mostRight.right !== cur) {
                mostRight = mostRight.right
            }
            // mostright变成了cur左子树上，最右的节点
            if(mostRight.right === null) { // 这是第一次来到cur
                mostRight.right = cur
                cur = cur.left
                continue
            } else { // mostRight.right === cur
                mostRight.right = null
            }
        }
        cur = cur.right
    }
}

/**
 * 先序遍历
 * 某个节点只会遍历到一次，直接打印
 * 会遍历两次，打印第一次
 */

 function morrisPre(head) {
    if (head === null) return

    let cur = head
    let mostRight = null
    while(cur !== null) {
        mostRight = cur.left // mostright是cur左孩子
        if(mostRight !== null) {// 有左子树
            while(mostRight.right !== null && mostRight.right !== cur) {
                mostRight = mostRight.right
            }
            // mostright变成了cur左子树上，最右的节点
            if(mostRight.right === null) { // 这是第一次来到cur
                console.log(cur.val)
                mostRight.right = cur
                cur = cur.left
                continue
            } else { // mostRight.right === cur
                mostRight.right = null
            }
        } else {
             // 没有左子树的情况
             console.log(cur.val)
        }
        cur = cur.right
    }
}

/**
 * 中序
 * 只有一次，直接打印
 * 两次，第二次打印
 */

 function morrisMid(head) {
    if (head === null) return

    let cur = head
    let mostRight = null
    while(cur !== null) {
        mostRight = cur.left // mostright是cur左孩子
        if(mostRight !== null) {// 有左子树
            while(mostRight.right !== null && mostRight.right !== cur) {
                mostRight = mostRight.right
            }
            // mostright变成了cur左子树上，最右的节点
            if(mostRight.right === null) { // 这是第一次来到cur
                mostRight.right = cur
                cur = cur.left
                continue
            } else { // mostRight.right === cur
                mostRight.right = null
            }
        }
        console.log(cur.val)
        cur = cur.right
    }
}

/**
 * 后序
 * 第二次回到某个节点，逆序打印左树右边界
 * 完成遍历后，逆序打印根的右边界
 */
 function morrisBack(head) {
    if (head === null) return

    let cur = head
    let mostRight = null
    while(cur !== null) {
        mostRight = cur.left // mostright是cur左孩子
        if(mostRight !== null) {// 有左子树
            while(mostRight.right !== null && mostRight.right !== cur) {
                mostRight = mostRight.right
            }
            // mostright变成了cur左子树上，最右的节点
            if(mostRight.right === null) { // 这是第一次来到cur
                mostRight.right = cur
                cur = cur.left
                continue
            } else { // mostRight.right === cur
                mostRight.right = null
                printEdge(cur.left)
            }
        }
        cur = cur.right
    }
    printEdge(head)
}

// 以x为头的树，逆序打印这个树的右边界
function printEdge(x) {
    let tail = reverseEdge(x)
    let cur = tail
    while (cur !== null) {
        console.log(cur.val)
        cur = cur.right
    }
    reverseEdge(tail)
}

function reverseEdge(from) {
    let pre = null
    let next = null
    while(from !== null) {
        next = from.right
        from.right = pre
        pre = from
        from = next

    }
    return pre
}