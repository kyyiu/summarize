const events = require("events");
const fs = require("fs");
const readline = require("readline");
const https = require("https");

const updateData = () => {
  try {
    const write = fs.createWriteStream("./data.json");
    // const rl = readline.createInterface({
    //     input: fs.createReadStream('./1.html'),
    //     output: write,
    //     crlfDelay: Infinity
    // });
    write.write(`{\n`);
    https
      .get(
        "https://datachart.500.com/pls/history/inc/history.php?limit=25108&start=1&end=55109",
        (res) => {
          let list = [];
          res.on("data", (chunk) => {
            const regex =
              /<tr class="t_tr1">\s*<!--<td>2<\/td>-->\s*<td class="t_tr1">(\d+)<\/td>\s*<td class="cfont2">([\d\s]+)<\/td>/g;

            let match;
            while ((match = regex.exec(chunk.toString())) !== null) {
              write.write(
                `"${match[2].split(" ").join("-")}-${match[1]}":1,\n`
              );
            }
          });
          res.on("end", () => {
            write.write(`}`);
          });
        }
      )
      .on("error", (err) => {
        console.log("Error: ", err.message);
      });
  } catch (err) {
    console.error(err);
  }
};
updateData();
// try {
//     const write = fs.createWriteStream('./data.json')
//     const rl = readline.createInterface({
//         input: fs.createReadStream('./index.html'),
//         output: write,
//         crlfDelay: Infinity
//     });
//     let date = ""
//     rl.on('line', (line) => {
//         const num = line.replace('<td class="cfont2">', '').replace("</td>", '').trim().split(" ")
//         const d = line.replace('<td class="t_tr1">', "").replace("</td>","").trim()
//         if (line.includes('<tr class="t_tr1">')) {
//             date = ""
//         }
//         if (d && !isNaN(+d) && !date) {
//             date = d
//         }
//         if (num?.length === 3) {
//             write.write(`"${num.join('-')}-${date}":1,\n`)
//         }
//     });

// } catch (err) {
//     console.error(err);
// }
