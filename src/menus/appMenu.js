const { app, dialog, nativeImage } = require('electron');
const path = require('path');
const isMac = process.platform === 'darwin'

module.exports = isMac ? [{
    label: app.name,
    submenu: [
        { label: 'About', 
          click: () => {
            const iconPath = path.join(__dirname, '../assets/icons/karma.png');
            const icon = nativeImage.createFromPath(iconPath);
            dialog.showMessageBox({
                title: 'About',
                message: 'Zenq v' + app.getVersion(),
                buttons: ['OK'],
                icon: icon
             });
          }
          
        },
        { type: 'separator' },
        { role: 'quit' }
    ]
}] : [];