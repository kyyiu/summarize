const genLeft = () => {
    const dic = {}
    let count = 0
    while (count < 6) {
        const num = Math.floor(Math.random() * 33) + 1
        if (!dic[num]) {
            dic[num] = true
            count++
        }
    }
    return Object.keys(dic)
}

const genRight = () => {
    return Math.floor(Math.random() * 16) + 1
}

console.log(genLeft(), genRight());
