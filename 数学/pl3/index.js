const data = require('./data.json')

const sampleDataLen = 10000;
const newstDateNum = 0;
const dataSample = Object.keys(data).slice(0, sampleDataLen).map(e => e.split('-'));


const firstRecommend = {
  1: 1,
  2: 2,
  3: 3,
  7: 7,
  8: 8,
};
const secondRecommend = {
  2: 2,
  3: 3,
  4: 4,
  7: 7,
  9: 9,
};
const lastRecommend = {
  1: 1,
  3: 3,
  5: 5,
  6: 6,
  7: 7,
};

const recommendRatio = () => {
  let r = 0;
  for (const sample of dataSample) {
    if (
      firstRecommend[sample[0]] &&
      secondRecommend[sample[1]] &&
      lastRecommend[sample[2]]
    ) {
      r += 1;
    }
  }
  return r / dataSample.length;
};

const ratio4 = {};
const firstFc = {}
const secondFc = {}
const lastFc = {}
const combine = {}

const numBetween4Ratio = () => {
    for (const sample of dataSample) {
        const num1 = sample[0]
        const num2 = sample[1]
        const num3 = sample[2]
        firstFc[num1] = firstFc[num1] || 0
        firstFc[num1] += 1
        secondFc[num2] = secondFc[num2] || 0
        secondFc[num2] += 1
        lastFc[num3] = lastFc[num3] || 0
        lastFc[num3] += 1
        const key = `${Number(num1>4)}-${Number(num2 > 4)}-${Number(num3 > 4)}`
        const combineKey = `${num1}-${num2}-${num3}`
        combine[combineKey] = combine[combineKey] || 0
        combine[combineKey] += 1
        // ratio4[key] = ratio4[key] || []
        // ratio4[key].push(sample)
        const ratioVal = ratio4[key] || 0
        ratio4[key] = ratioVal + 1
    }
}
// numBetween4Ratio()
// console.log(ratio4);
// console.log(firstFc);
// console.log(secondFc);
// console.log(lastFc);
// console.log(combine);


// 0.2
const killNumWay1 = (mid) => {
    const killDic = {
        5: 9,
        2: 6,
        7: 2,
        6:1,
        3:4,
        1:8,
        0:0,
        9:6,
        4:7,
        8:3
    }
    return killDic[mid]
    // let killErr = 0
    // for (let i = dataSample.length-1; i>=0; i--) {
    //     const sample = dataSample[i]
    //     const nextSample = dataSample[i-1]
    //     const needKill = killDic[sample[1]]
    //     if (nextSample?.slice(0,3)?.includes(`${needKill}`)) {
    //         killErr += 1 
    //     }
    // }
    // console.log("误杀率:" , killErr/dataSample.length);
}

// 百位误杀率0.1
const killNumWay2 = (newDate) => {
  return ((+newDate*3+3)%10)
    //     const kill = 
    // let killErr = 0
    // for (let i = dataSample.length-1; i>=0; i--) {
    //     const sample = dataSample[i]
    //     const date = (+sample[3])%10
    //     const kill = (date*3+3)%10
    //     if (+sample[0] === kill) {
    //         killErr += 1
    //         console.log(sample);
            
    //     }
    // }
    // console.log("误杀率:" , killErr/dataSample.length);
}

// 0.25
const killNumWay3 = (sample) => {
  return (+sample[0] + +sample[1] + +sample[2])%10
  // let killErr = 0
  // for (let i = dataSample.length-1; i>=0; i--) {
  //     const sample = dataSample[i]
  //     const nextSample = dataSample[i-1]
  //     const needKill = (+sample[0] + +sample[1] + +sample[2])%10
  //     if (nextSample?.slice(0,3)?.includes(`${needKill}`)) {
  //         killErr += 1 
  //     }
  // }
  // console.log("误杀率:" , killErr/dataSample.length);
}

const getNums = (newestSample, nextSample) => {
    const newest = newestSample || dataSample[0]
    const killAll_1 = killNumWay1(newest[1])
    const killAll_2 = killNumWay3(newest)
    const killFirst = killNumWay2(nextSample[3])
    const res = []
    while(res.length < 3) {
        let nums = []
        while(nums.length < 6) {
            const n = Math.floor( Math.random()*10 )
            if ([killAll_1, killAll_2].includes(n) || nums.includes(n)) {
                continue
            }
            // 杀百位
            if (!res.length && n === killFirst) {
              continue
            }
            nums.push(n)
        }
        res.push(nums)
    }
    return res
}

const checkRatio = () => {
    let target = 0
    for (let i = dataSample.length-1; i>=0;i--) {
        const nextSample = dataSample[i-1] || []
        const recommendNums = getNums(dataSample[i], nextSample)
        const f = recommendNums[0].includes(+nextSample[0])
        const s = recommendNums[1].includes(+nextSample[1])
        const l = recommendNums[2].includes(+nextSample[2])
        if (f && s && l) {
            target += 1
        }
    }
    return target / dataSample.length
}
// console.log(checkRatio());
// let r = 0
// for (let i = 0; i<100; i++) {
//   r+=checkRatio()
// }
// console.log(r/100);

console.log(getNums(undefined, [undefined, undefined, undefined, newstDateNum]));
