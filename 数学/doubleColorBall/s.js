const events = require('events');
const fs = require('fs');
const readline = require('readline');

try {
    const write = fs.createWriteStream('./data.json')
    const rl = readline.createInterface({
        input: fs.createReadStream('./1.html'),
        output: write,
        crlfDelay: Infinity
    });
    let curN = []
    rl.on('line', (line) => {
        const num = line.replace('<td class="t_cfont2">', '').replace('<td class="t_cfont4">', '').replace('</td>', '').trim()
        if (num && !isNaN(+num)) {
            curN.push(num)
        }
        if (curN.length === 7) {
            write.write(`"${curN.slice(0,6).join('-')}#${curN.pop()}":1,\n`)
            curN = []
        }
    });

} catch (err) {
    console.error(err);
}