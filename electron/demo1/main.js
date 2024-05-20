const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const s = require('./preload/s1')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname,'preload', 'index.js')
        },
    })
    win.loadFile('index.html')
    win.webContents.openDevTools()
}

app.whenReady().then(() => {
    ipcMain.handle("ipc", () => s.g)
    createWindow()
})