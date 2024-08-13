
const information = document.getElementById('info')
const slider = document.getElementById('slider')
const sliderVal = document.getElementById('slider_val')
const back = document.getElementById('back')
const url = document.getElementById('url')

slider.addEventListener('change', (e) => {
    window.preload.opacity(e.target.valueAsNumber)
    sliderVal.innerText = e.target.valueAsNumber
})
back.addEventListener('click', () => {
    window.preload.back()
})

window.preload.getUrl((e, msg) => {
    url.innerText = msg
})

const f = async () => {
    const res = await window.preload.sipc()
    information.innerText = `本应用正在使用 Chrome (v${preload.chrome()}), Node.js (v${preload.node()}), 和 Electron (v${preload.electron()})---${res}`
}

f()