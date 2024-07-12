
const information = document.getElementById('info')
const slider = document.getElementById('slider')
const sliderVal = document.getElementById('slider_val')
const back = document.getElementById('back')

slider.addEventListener('change', (e) => {
    window.preload.opacity(e.target.valueAsNumber)
    sliderVal.innerText = e.target.valueAsNumber
})
back.addEventListener('click', () => {
    window.preload.back()
})

const f = async () => {
    const res = await window.preload.sipc()
    console.log("TTT", res)
    information.innerText = `本应用正在使用 Chrome (v${preload.chrome()}), Node.js (v${preload.node()}), 和 Electron (v${preload.electron()})---${res}`
}

f()