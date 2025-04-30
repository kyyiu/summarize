const data = require('./data.json')
const kr = require('./killRed.js')

const prizeRes = Object.keys(data)

const sampleNum = 100
// 2：2：2 
// 2：3：1
const ratio = {}
// [87, 119]
const sum = {}
const total = [0, 0,0,0,0,0, 0]
const fc = [0, 0,0, 0, 0,0,0]
const continuous = {}
const ln = {
    0: [], // 1~4
    1: [], // 8~11
    2: [], // 16~18
    3: [], // 18~24
    4: [],// 25 ~ 31
    5: [] // 32 ~ 33
}

const rn = []

const sampleData = prizeRes.slice(0, sampleNum).map((item) => {
    const [leftStr, right] = item.split('#')
    const left = leftStr.split('-').map(e => +e)
    let l = 0
    let m = 0
    let r = 0
    // for (const n of left) {
    //     if (+n <= 11) {
    //         l+=1
    //         continue
    //     }
    //     if (+n > 11 && +n <= 22) {
    //         m+=1
    //         continue
    //     } else {
    //         r+=1
    //     }
    // }
    for (const idx in left) {
        const cl = left[idx]
        ln[+idx].push(cl)
        if (cl + 1 == left[+idx+1]) {
            const lastContinuous = continuous[`${cl}_${cl+1}`] || 0
            continuous[`${cl}_${cl+1}`] = (lastContinuous + 1)
        }
        total[idx] += cl
    }
    rn.push(right)
    const sumLeft = left.reduce((a, b) => +a + +b, 0)
    const k = `${l}:${m}:${r}`
    if (!ratio[k]) {
        ratio[k] = 0
    }
    if (!sum[sumLeft]) {
        sum[sumLeft] = 0
    }
    ratio[k] += 1
    sum[sumLeft] += 1
   return  [left, +right, k, sumLeft]
})

console.log(ratio);
console.log(sum);
// console.log(sampleData);

const avg = total.map((item, idx) => item / sampleNum)

console.log('连续次数', continuous);
console.log('总次数', total);
console.log('平均', avg);

prizeRes.slice(0, sampleNum).forEach((item) => {
    const [leftStr, right] = item.split('#')
    const left = leftStr.split('-').map(e => +e) 
    for (const idx in left) {
        const cl = left[idx]
        fc[idx] += Math.pow(avg[idx] - cl, 2)
    }
})

console.log('方差', fc);



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

const left = genLeft()
const right = genRight()

for (let i = sampleData.length - 1; i >= 0; i--) {
    const cur = sampleData[i-1]
    if (!cur) {
        break
    }
    const [curLeft] = cur
    const [lastLeft] = sampleData[i]
    const kill = {}
    for (const n of lastLeft) {
         kill[n] = 1
    }
    let killErrNum = 0
    for (const n of curLeft) {
         if (kill[n]) {
             killErrNum+=1
         }
    }
    cur.push(killErrNum)
 }

console.log(left, right, Object.values(ln).map(e => e.sort((a,b) => a-b)), rn.sort((a, b) => a-b));
// 95 ~ 112  99 106 ~ 108
// 95 96 111 112
console.log('左和', left.reduce((a, b) => Number(a) + Number(b)), data[`03-06-14-22-31-32#11`]);

