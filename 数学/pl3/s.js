const events = require('events');
const fs = require('fs');
const readline = require('readline');

try {
    const write = fs.createWriteStream('./data.json')
    const rl = readline.createInterface({
        input: fs.createReadStream('./index.html'),
        output: write,
        crlfDelay: Infinity
    });
    let date = ""
    rl.on('line', (line) => {
        const num = line.replace('<td class="cfont2">', '').replace("</td>", '').trim().split(" ")
        const d = line.replace('<td class="t_tr1">', "").replace("</td>","").trim()
        if (line.includes('<tr class="t_tr1">')) {
            date = ""
        }
        if (d && !isNaN(+d) && !date) {
            date = d
        }
        if (num?.length === 3) {
            write.write(`"${num.join('-')}-${date}":1,\n`)
        }
    });

} catch (err) {
    console.error(err);
}