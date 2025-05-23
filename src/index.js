const { app, BrowserWindow, ipcMain } = require('electron');
const { generateMenu } = require('./menus');
const serve = require("electron-serve"); 
const path = require('path');
const Store = require('electron-store');
const { serveSamples } = require('./samples/index.js');

const store = new Store();

require('dotenv').config();

const isLocalDevelop = process.env.IS_LOCAL_DEVELOP && (process.env.IS_LOCAL_DEVELOP === 'true');

const loadURL = serve({directory: './src/app'});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    frame: true,
    width: 1600,
    height: 900,
    minWidth: 1200,
    // center: true,
    x: 0,
    y: 0,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Set the zoom factor to 100%
  mainWindow.webContents.setZoomFactor(1.0);

  // generate main menu
  generateMenu({mainWindow});
  
  const sampleDirectory = store.get('sampleDirectory');
  sampleDirectory && serveSamples(sampleDirectory);

    // and load the index.html of the app.
  isLocalDevelop 
    ? mainWindow.loadURL(`http://localhost:${5173}`) // use this when running in dev mode
    : loadURL(mainWindow);

  // Open the DevTools.
  if (isLocalDevelop) {
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => createWindow());

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
