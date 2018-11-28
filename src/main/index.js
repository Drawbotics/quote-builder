const { app, BrowserWindow, Menu } = require('electron');
const dotenv = require('dotenv');
const path = require('path');
const windowStateKeeper = require('electron-window-state');

const createMenu = require('./menu');


dotenv.config();


let _window;


module.exports = function startApp() {
  function createWindow() {

    const windowState = windowStateKeeper({
      defaultWidth: process.env.APP_ENV === 'development' ? 1990 : 1440,
      defaultHeight: 900
    });

    _window = new BrowserWindow({
      width: windowState.width,
      height: windowState.height,
      x: windowState.x,
      y: windowState.y,
      titleBarStyle: 'hiddenInset',
      backgroundColor: '#FFFFFF',
      icon: path.resolve(__dirname, '/app/images/qtp-desktop-small.png'),
      webPreferences: {
        webSecurity: false,
      },
      show: false,
    });

    windowState.manage(_window);

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

    Menu.setApplicationMenu(createMenu(app, _window));

    _window.on('ready-to-show', () => {
      _window.show();
      _window.focus();
    });
  }


  app.on('ready', createWindow);


  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      _window.quit();
    }
  });


  app.on('activate', () => {
    if (_window === null) {
      createWindow();
    }
  });
}
