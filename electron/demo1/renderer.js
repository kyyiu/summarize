const information = document.getElementById('info')

const f = async () => {
    const res = await window.preload.sipc()
    console.log("TTT", res)
    information.innerText = `本应用正在使用 Chrome (v${preload.chrome()}), Node.js (v${preload.node()}), 和 Electron (v${preload.electron()})---${res}`
}

f()