const electron = require('electron');
const ipc = require('electron-better-ipc');


function toggleThemeFromMenu() {
  const win = electron.BrowserWindow.getFocusedWindow();
  ipc.callRenderer(win, 'toggleTheme');
}


module.exports = {
  toggleThemeFromMenu,
}
