const electron = require('electron');
const ipc = require('electron-better-ipc');


function getCurrentWindow() {
  return electron.BrowserWindow.getFocusedWindow();
}


function sendIpcAction(actionName, data) {
  ipc.callRenderer(getCurrentWindow(), actionName, data);
}


module.exports = {
  sendIpcAction,
}
