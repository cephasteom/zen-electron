const { dialog } = require('electron');
const Store = require('electron-store');
const { serveSamples } = require('../samples/index.js');
const fs = require('fs');

const isMac = process.platform === 'darwin'

const store = new Store();

module.exports.generateFileMenu = ({
    mainWindow
}) => {
    
    return [{
        label: 'File',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click: () => mainWindow.reload(),
            },
            {
                label: 'Open',
                accelerator: 'CmdOrCtrl+O',
                click: () => {
                    dialog.showOpenDialog({
                        title: 'Open File',
                        properties: ['openFile'],
                        filters: [
                            { name: "JavaScript Files", extensions: ['js'] }
                        ]
                    }).then(({canceled, filePaths}) => {
                        if (canceled) return;
                        const file = fs.readFileSync(filePaths[0], 'utf8');
                        mainWindow.webContents.send('load', file);
                    })
                }
            },
            { 
                label: 'Load Samples Directory', 
                click: () => {
                    dialog.showOpenDialog({
                        title: 'Load Samples Library',
                        properties: ['openDirectory']
                    }).then(({canceled, filePaths}) => {
                        if (canceled) return;
                        const wasServed = serveSamples(filePaths[0]);
                        wasServed && store.set('sampleDirectory', filePaths[0]);
                        wasServed && mainWindow.reload();
                    })
                } 
            },
            { type: 'separator' },
            isMac ? { role: 'close' } : { role: 'quit' }
        ]
    }]
};