const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('isApp', true)