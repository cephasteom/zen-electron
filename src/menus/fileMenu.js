const { dialog } = require('electron');
const Store = require('electron-store');
const { serveSamples } = require('../samples/index.js');

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