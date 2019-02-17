const update = require('update-electron-app');
const findProcess = require('find-process');


const BUNDLE_NAME = 'com.electron.quotedp';
const SHIP_IT_BINARY = 'ShipIt';

let shouldRestartBeforeLaunch = false;


async function makeSureAutoUpdateFinished(launchApp) {
  const shipItProcesses = await findProcess('name', SHIP_IT_BINARY);
  if (shipItProcesses.some(f => f.cmd.includes(BUNDLE_NAME))) {
    // if we don't restart, the old app from memory will keep running
    shouldRestartBeforeLaunch = true;
    console.debug('Waiting for auto update to finish');
    setTimeout(makeSureAutoUpdateFinished, 1500);
  } else {
    if (shouldRestartBeforeLaunch) {
      try {
        const electron = require('electron');
        electron.app.relaunch();
        electron.app.exit(0);
      } catch (error) {
        console.error('Failed to restart the app through electron', error);
        process.exit(1);
      }
    } else {
      launchApp();
    }
  }
}



module.exports = function autoUpdate(launchApp) {
  console.log('gonna call autoupdate');
  update();
  // makeSureAutoUpdateFinished(launchApp);
}
