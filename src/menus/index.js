const { Menu } = require('electron');
const appMenu = require('./appMenu');
const { generateFileMenu } = require('./fileMenu');

module.exports.generateMenu = (args = {
    userPresets: [],
    mainWindow
}) => {
    const { userPresets, mainWindow } = args;
    const fileMenuArgs = { userPresets, mainWindow };
    const template = [
        ...appMenu,
        ...generateFileMenu(fileMenuArgs), // dynamic menu based on presets
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'pasteandmatchstyle' },
                { role: 'delete' },
                { role: 'selectall' }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { role: 'toggledevtools' },
                { type: 'separator' },
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        }
    ];
    const mainMenu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(mainMenu);
}