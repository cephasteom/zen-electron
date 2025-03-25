const { app } = require('electron');
const http = require('http');
const fs = require('fs');
const express = require('express');
const expressApp = express();
const cors = require('cors');
const dirTree = require("directory-tree");

let server;

function formatUrl(url) {
    return url.replace(/ /g, '%20');
}
function formatItem(name, url) {
    const [, ext] = name.split(".");
    const group = url.split("/")[url.split("/").length - 2];
    return ['wav', 'flac', 'mp3'].includes(ext) 
        ? { 
            group, 
            url: formatUrl('http://localhost:6060/' + group + '/' + name)
        } : false;
}

function compile(array) {
    return array
        .map(({path, name, children}) => children
            ? compile(children)
            : formatItem(name, path)
        )
        .filter(path => path)
        .flat(128)
}

const compileSamples = (dirs) => compile(dirs)
    .reduce((obj, item) => ({
        ...obj,
        [item.group]: obj[item.group] ? [...obj[item.group], item.url] : [item.url]
    }), {})

const serveSamples = function(directory) {
    // clean up old server
    server && server.close();
    const tree = dirTree(directory);

    try {
        const samples = compileSamples(tree.children);
        const json = JSON.stringify(samples);

        fs.writeFile(directory + '/samples.json', json, 'utf8', (err) => {
            err
                ? console.log(`Error writing samples file: ${err}`)
                : console.log(`Samples file is written successfully!`);
        });
    
        expressApp.use(cors());
        expressApp.use('/', express.static(directory));
        server = http.createServer(expressApp);
        server.listen(6060, () => console.log('Sample library server listening on port 6060'));
    
        return true;
    } catch (e) {
        // TODO: send error to main window
        console.error(e);
        return false;
    }
}

app.on('quit', () => {
    console.log('Shutting down sample server');
    server && server.close();
})

module.exports.serveSamples = serveSamples;