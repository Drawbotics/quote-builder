const { app, BrowserWindow, Menu } = require('electron');
const settings = require('electron-settings');
const dotenv = require('dotenv');

const createMenu = require('./menu');
const registerIpcListeners = require('./ipc-listeners');


dotenv.config();


let _window;


module.exports = function startApp() {
  function createWindow() {
    _window = new BrowserWindow({
      width: process.env.APP_ENV === 'development' ? 1990 : 1440,
      height: 900,
      titleBarStyle: 'hiddenInset',
      webPreferences: {
        webSecurity: false,
      },
    });

    if (process.env.APP_ENV === 'development') {
      _window.loadURL(`http://localhost:${process.env.WEBPACK_PORT}`);
      _window.webContents.openDevTools();
    }
    else {
      _window.loadFile('dist/index.html');
    }

    _window.on('closed', () => {
      _window = null;
    });

    registerIpcListeners();

    Menu.setApplicationMenu(createMenu(app, _window));
  }


  app.on('ready', createWindow);


  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });


  app.on('activate', () => {
    if (_window === null) {
      createWindow();
    }
  });
}
