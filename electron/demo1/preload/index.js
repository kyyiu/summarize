
const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('preload', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    sipc: () => ipcRenderer.invoke('ipc')
})