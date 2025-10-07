const { dialog, ipcMain } = require('electron');
const Store = require('electron-store');
const { serveSamples } = require('../samples/index.js');
const fs = require('fs');

const isMac = process.platform === 'darwin'

const store = new Store();

store.set('currentFile', null);

module.exports.generateFileMenu = ({
    mainWindow
}) => {
    const save = (filePath) => {
        // ask mainwindow for current editor contents
        console.log(filePath);
        mainWindow.webContents.send('getCode');
        ipcMain.once('getCodeResponse', (_, response) => {
            // write to file
            fs.writeFile(filePath,
                response,
                'utf8',
                (err) => err
                    ? console.error(`Error writing file: ${err}`)
                    : console.log(`File is written successfully!`)
            );

            store.set('currentFile', filePath);
        });
    }

    const saveAs = () => {
        dialog.showSaveDialog({
            title: 'Save File',
            filters: [
                { name: "JavaScript Files", extensions: ['js'] }
            ]
        }).then(({canceled, filePath}) => {
            if (canceled) return;
            save(filePath);
        })
    }
    
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
                        const fileName = filePaths[0].split('/').pop();
                        mainWindow.setTitle(`${fileName}`);
                        mainWindow.webContents.send('load', file);
                        store.set('currentFile', filePaths[0]);
                    })
                }
            },
            { type: 'separator' },
            {
                label: 'Save',
                accelerator: 'CmdOrCtrl+S',
                click: () => store.get('currentFile')
                    ? save(store.get('currentFile'))
                    : saveAs()
            },
            {
                label: 'Save As',
                accelerator: 'CmdOrCtrl+Shift+S',
                click: () => saveAs()
            },
            { type: 'separator' },
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