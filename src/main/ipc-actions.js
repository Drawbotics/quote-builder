const electron = require('electron');
const ipc = require('electron-better-ipc');


function getCurrentWindow() {
  return electron.BrowserWindow.getFocusedWindow();
}


function sendIpcAction(actionName) {
  ipc.callRenderer(getCurrentWindow(), actionName);
}


module.exports = {
  sendIpcAction,
}
