const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('isApp', true)

contextBridge.exposeInMainWorld('electronAPI', {
    onLoad: (callback) => ipcRenderer.on('load', (_, string) => callback(string)),
    onGetCode: (callback) => ipcRenderer.on('getCode', () => callback()),
    getCodeResponse: (string) => ipcRenderer.send('getCodeResponse', string),
})