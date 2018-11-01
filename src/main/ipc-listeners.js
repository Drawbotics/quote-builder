const ipc = require('electron-better-ipc');
const settings = require('electron-settings');


module.exports = function registerIpcListeners() {
  ipc.answerRenderer('request-theme-update', ({ theme }) => {
    settings.set('theme', theme);
  });
}
