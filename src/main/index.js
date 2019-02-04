const { app, BrowserWindow, Menu } = require('electron');
const dotenv = require('dotenv');
const path = require('path');
const windowStateKeeper = require('electron-window-state');

const createMenu = require('./menu');
const startServer = require('./static-server');
const { sendIpcAction } = require('./ipc-actions');
const autoUpdate = require('./auto-update');


dotenv.config();


const IS_DEV = process.env.APP_ENV === 'development';


let _window;


if (! IS_DEV) {
  // autoUpdate();
}


module.exports = function startApp() {
  async function createWindow() {

    const port = IS_DEV ? process.env.WEBPACK_PORT : await startServer();

    global._serverPort = port;

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
        experimentalFeatures: true,
      },
      show: false,
    });

    windowState.manage(_window);

    _window.loadURL(`http://localhost:${port}`);

    if (IS_DEV) {
      _window.webContents.openDevTools();
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

  app.on('will-finish-launching', () => {
    app.on('open-file', (ev, url) => {
      if (_window === null) {
        createWindow();
      }
      sendIpcAction('openFile', url);
    });
  })

}
