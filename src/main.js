const { app, BrowserWindow } = require('electron');
const dotenv = require('dotenv');

dotenv.config();


let _window;


function createWindow() {
  _window = new BrowserWindow({
    width: 1400,
    height: 1000,
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
}

// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (_window === null) {
    createWindow();
  }
});
