const { app } = require('electron');
const fs = require('fs');
const http = require('http');
const path = require('path');
const express = require('express');
const expressApp = express();
const cors = require('cors');

const Store = require('electron-store');
const store = new Store();

let server;

const serveSamples = function(directory, mainWindow) {
    // clean up old server
    server && server.close();

    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error("An error occurred reading the directory :", err);
            return;
        }
        const samples = files
            .filter(file => ['.wav', '.mp3', '.flac'].includes(path.extname(file)))
            .map(file => `http://localhost:1024/samples/${file}`)

        expressApp.use(cors());
        expressApp.use('/samples', express.static(directory));
        server = http.createServer(expressApp);
        server.listen(1024, () => {
            console.log('Sample library server listening on port 1024');
            mainWindow.webContents.send('updateSamples', samples);
        });

        store.set('sampleDirectory', directory);
    });
}

app.on('ready', () => {
    const directory = store.get('sampleDirectory');
    // TODO: reinstate once we have main win
    // directory && serveSamples(directory);
});

app.on('quit', () => {
    console.log('Shutting down sample server');
    server && server.close();
})

module.exports.serveSamples = serveSamples;