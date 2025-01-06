const events = require('events');
const fs = require('fs');
const readline = require('readline');

try {
    const write = fs.createWriteStream('./star7.json')
    const rl = readline.createInterface({
        input: fs.createReadStream('./start7.html'),
        output: write,
        crlfDelay: Infinity
    });

    rl.on('line', (line) => {
        const nums = line.replace('<span class="cBlue"></span>', '').trim().split(' ')
        if (!isNaN(+nums.join('')) && nums.length === 7) {
            write.write(`"${nums.slice(0,6).join('')}#${nums.pop()}":1,\n`)
        }
    });

} catch (err) {
    console.error(err);
}