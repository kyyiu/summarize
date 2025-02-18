const axios = require("axios");

const cheerio = require("cheerio");

const fs = require("fs");

const path = require("path");

function extractImageUrls(html) {
  const $ = cheerio.load(html);

  const imageUrls = [];

  $("img").each((index, element) => {
    const src = $(element).attr("src");

    // 对图片链接进行处理，补全相对路径等

    const imageUrl = new URL(src, "http://example.com").href;

    imageUrls.push(imageUrl);
  });

  return imageUrls;
}

async function fetchPage(url) {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error(error);

    throw new Error("Failed to fetch the page");
  }
}

async function downloadImage(url, savePath) {
  try {
    const response = await axios.get(url, { responseType: "stream" });
    const etc = path.basename(url).split(".").pop();

    const filePath = path.join(savePath, `${Date.now().toString(36)}.${etc}`);

    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);

      writer.on("error", reject);
    });
  } catch (error) {
    console.error(error);

    throw new Error("Failed to download the image");
  }
}

async function main() {
  // https://yande.re/post.json?page=1
  // https://konachan.com/post.json?page=1
  // https://konachan.net/post.json?page=1
  const page = 2;
  const totalPage = 100;
  const dict = {
    yande: ["https://yande.re/post.json?page=", "yandeRe"],
    konachanCom: ["https://konachan.com/post.json?page=", "konachanCom"],
    konachanNet: ["https://konachan.net/post.json?page=", "konachanNet"],
  };
  const fetchObj = dict.konachanNet;

  for (let start = page; start < totalPage; start++) {
    try {
      const url = `${fetchObj[0]}${start}`;

      const savePath = path.join(__dirname, `${fetchObj[1]}/${start}`);
      const json = await fetchPage(url);
      // const imageUrls = extractImageUrls(html);
      if (!fs.existsSync(savePath)) {
        fs.mkdirSync(savePath, { recursive: true });
      }
      let cur = 0;
      for (const imgItem of json) {
        cur++;
        await downloadImage(imgItem.sample_url, savePath);
        console.log(`当前${start}-${cur}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

main();
