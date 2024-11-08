const fs = require('fs');
const path = require('path');
const { dialog, ipcMain } = require('electron');
const { serveSamples } = require('../samples/index.js');

const isMac = process.platform === 'darwin'

module.exports.generateFileMenu = ({
    userPresets = [], 
    mainWindow
}) => {
    
    return [{
        label: 'File',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click: () => mainWindow.reload()
            },
            // { label: 'Select Samples Directory', click: () => {
            //     dialog.showOpenDialog({
            //         title: 'Select Sample Library',
            //         properties: ['openDirectory']
            //     }).then(({canceled, filePaths}) => {
            //         if (canceled) return;
            //         serveSamples(filePaths[0], mainWindow);
            //     })
            // } },
            { type: 'separator' },
            isMac ? { role: 'close' } : { role: 'quit' }
        ]
    }]
};