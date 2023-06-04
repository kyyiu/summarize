function deep(obj) {
    let newObj = Array.isArray(obj) ? [] : {}
    for(let key in obj) {
        const isSimple = !(obj[key] && typeof obj[key] === 'object')
        newObj[key] = isSimple ? obj[key] : deep(obj[key])
    }
    return newObj
}

const clone = deep(originObj)