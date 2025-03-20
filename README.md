# Zen Electron App
## About
This codebase contains the Electron 'shell' that houses the [Zen web app](https://zen.cephasteom.co.uk/). It enables this web app to be packaged up as a desktop app for Mac OS, Linux and Windows.

It is an installation of the Electron-Forge project - an all-in-one tool for packaging and distributing Electron applications. For more information, see the [Electron-Forge docs](https://www.electronforge.io/).

The web app that this 'shell' houses, as well as information on how to actively work on it, can be found [here](https://github.com/cephasteom/zen-3).

## Local Development
To install packages, run:
* `nvm use` - switches to correct version of Node
* `yarn` - installs Node packages (dependencies)
You can develop this application and the web application concurrently. 
* Spin up [local version of web app](https://github.com/cephasteom/zen-3) 
* http://localhost:5173 to view the web application
* `yarn start` or `npm run start` to view the desktop application

## Building Distributables
[Electron-Forge docs](https://www.electronforge.io/#building-distributables)

* In the web app repo, run `yarn build` or `npm run build` to generate a bundled version of the html, css and js files
* Clear the contents of src/app in this repo
* Copy the contents of the build/ folder in the web app repo into src/app in this repo
* `yarn make` or `npm run make` to package up the distributable for the platform you are currently working on
* `yarn make --arch=arm64,x64` or `npm run make --arch=arm64,x64` to package up distributables for both Apple Intel and Apple Silicon chips

## Downloading the App
Head to [Releases](https://github.com/cephasteom/zen-electron/releases) and download the correct asset for your platform. 
* `arm64` is Apple Silicon (M1, M2, M3 chips)
* `x64` is Apple Intel

Unzip the download package and open the app.

## Security
This is not a commercial application, which means we don't send it off to Apple to code sign or notarise. After downloading the app, you may not be able to open it due to missing permissions. Approve the app using the following steps:
* On older MacOSs, go to System Preferences > Security and Privacy and give approval
* On newer MacOSs, in a terminal, run `xattr -d com.apple.quarantine /path/to/app`, e.g. `xattr -d com.apple.quarantine ~/Downloads/Zen.app`
