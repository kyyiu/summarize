const fs = require('fs')
const path = require('path')
const dirs = fs.readdirSync('./').filter(e => !e.includes('js'))
while (dirs.length) {
    const dirName = dirs.shift()
    const dirPath = path.join(__dirname, dirName)
    const files = fs.readdirSync(dirPath)
    const m3u8File = files.find(e => e.includes('m3u8'))
    const fileContent = fs.readFileSync(path.join(dirPath, m3u8File)).toString()
    const replaceURI = fileContent.replace(/(?<=URI=").*(?=")/, path.join(dirPath, 'crypt.key')).replace(/\\/g, '/')
    const replaceTS = replaceURI.split(/\r|\n/).map(s => {
        if(s.includes('.ts')) {
            s = s.replace(/(.*\.ts).*/, "$1")
            return path.join(dirPath, s)
        }
        return s
    }).join("\n")
    fs.writeFile(`./${dirName}/${dirName}.m3u8`, replaceTS, err=>{console.log(err)})
}

// 
// 核心命令
// ffmpeg -allowed_extensions ALL -i index.m3u8 -c copy out.mp4
// 预处理
// .m3u8文件中
// 处理好路径如下
// URI=“D:/temp/vd201906291/key.key”
// 包括切片ts文件，如下
// #EXTINF:0,
// D:\temp\vd201906291\O7rSBp5l5847000.ts
// 然后直接运行命令即可
// 会得到一个合成好的out.mp4