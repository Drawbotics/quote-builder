const electron = require('electron');
const ipc = require('electron-better-ipc');


function getCurrentWindow() {
  return electron.BrowserWindow.getFocusedWindow();
}


function sendIpcAction(actionName, data) {
  console.log('calling renderer with action ', action);
  ipc.callRenderer(getCurrentWindow(), actionName, data);
}


module.exports = {
  sendIpcAction,
}
