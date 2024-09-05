/** 收集节点
 * checkDic 已经选中的节点
 * collectChecked 收集已经标记选中的节点
 * collectChecked2Upload 收集标记节点和上面的所有祖先点
*/
// function deep(item: any, checkDic?: Record<string, any>, collectChecked?: Record<any, any>, collectChecked2Upload?: Record<any, any>) {
function deep1(item, checkDic, collectChecked, collectChecked2Upload) {
if (item && checkDic) {
    item.checked = !!checkDic[item.id]
}
if (item && item.checked) {
    if (collectChecked) {
    collectChecked[item.id] = item.id
    }
    if (collectChecked2Upload) {
    collectChecked2Upload[item.id] = item.id
    }
}
// 子节点是否全选
let checkedCount = 0
let checkedSubCount = 0
if (item.children) {
    item.children.forEach((e) => {
    // 叶节点判断
    if (e.pid && e.children && !e.children.length) {
        e.icons = {
        switcherIcon: null,
        }
    }
    const [isChildCheck, isAllchecked] = deep(e, checkDic, collectChecked, collectChecked2Upload) || []
    if (isChildCheck) {
        checkedSubCount += 1
    }

    if (isAllchecked) {
        checkedCount+=1
    }
    if (isChildCheck && collectChecked2Upload) {
        collectChecked2Upload[item.id] = item.id
    }
    })
    let leafCheck = false
    let isLeaf = false
    if (item.pid && item.children && !item.children.length) {
    isLeaf = true
    leafCheck = item.checked
    }
    const checkedAll = isLeaf ? item.checked : (checkedCount === (item.children?.length || 0))
    if (!checkedAll && collectChecked) {
    delete collectChecked[item.id]
    }
    // if (!checkedAll && collectChecked2Upload) {
    //   delete collectChecked2Upload[item.id]
    // }
    return [!!checkedSubCount || item.checked, isLeaf ? item.checked : checkedAll]
}
}


/** 
 * 标记节点禁用和祖先节点禁用 
 * 
 * checkDic禁用字典
 * fatherDisable祖先是否禁用
 * */
// const deep2 = (items: any[], checkDic: Record<string, string>, fatherDisable?: boolean) => {
const deep2 = (items, checkDic, fatherDisable) => {
	if (items.length) {
		let c = 0;
		for (const item of items) {
			if (checkDic[item.orgCode] || fatherDisable) {
				item.disableCheckbox = true;
				// 叶子节点禁用数量标记
				if (!item.children?.length) {
					c += 1
				}
			}
			// 得到下层的禁用数量
			const len = deep(item.children, checkDic, item.disableCheckbox);
			// 父节点禁用数量标记
			if (len === item.children?.length) {
				item.disableCheckbox = true;
				c += 1
			}
		}
		// 返回当前层的禁用数量
		return c
	}
};