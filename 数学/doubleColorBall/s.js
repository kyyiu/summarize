const events = require("events");
const fs = require("fs");
const readline = require("readline");
const https = require("https");

const killRed = () => {
    try {
        const write = fs.createWriteStream("./killRed.js");
        const nb1Numbers = [];
        https
          .get("https://zx.500.com/ssq/zhuanjiashahao.php?expectnum=30", (res) => {
            let list = [];
            res.on("data", (chunk) => {
              
              chunk
                .toString()
                .replace(
                  /<span class="nub-ball nb1">(\d{2})<\/span>/g,
                  (match, number) => {
                    nb1Numbers.push(number);
                    return match; // 保持原字符串不变
                  }
                );
              
            });
            res.on('end', ()=> {
                write.write(
                    `module.exports = ${JSON.stringify(nb1Numbers)}`
                );
            })
          })
          .on("error", (err) => {
            console.log("Error: ", err.message);
          });
      } catch (err) {}
}
let writting = false
const updateData = () => {
    try {
        const write = fs.createWriteStream('./data.json')
        // const rl = readline.createInterface({
        //     input: fs.createReadStream('./1.html'),
        //     output: write,
        //     crlfDelay: Infinity
        // });
        write.write(`{\n`)
        let curN = []
        https
          .get("https://datachart.500.com/ssq/history/newinc/history.php?start=1&end=55047", (res) => {
            let list = [];
            res.on("data", (chunk) => {
              chunk
                .toString()
                .replace(
                  /<td class="t_cfont[24]">(\d{2})<\/td>/g,
                  (match, num) => {
                    if (num && !isNaN(+num)) {
                        curN.push(num)
                    }
                    if (curN.length === 7) {
                        write.write(`"${curN.slice(0,6).join('-')}#${curN.pop()}":1,\n`)
                        curN = []
                    }
                    return match; // 保持原字符串不变
                  }
                );
            });
            res.on('end', ()=> {
                write.write(`}`)
            })
          })
          .on("error", (err) => {
            console.log("Error: ", err.message);
          });
        
    
    } catch (err) {
        console.error(err);
    }
}
updateData()
// rl.on('line', (line) => {
//     const num = line.replace('<td class="t_cfont2">', '').replace('<td class="t_cfont4">', '').replace('</td>', '').trim()
//     if (num && !isNaN(+num)) {
//         curN.push(num)
//     }
//     if (curN.length === 7) {
//         write.write(`"${curN.slice(0,6).join('-')}#${curN.pop()}":1,\n`)
//         curN = []
//     }
// });

