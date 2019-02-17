const update = require('update-electron-app');


module.exports = function autoUpdate() {
  console.log('Going to call autoupdate');
  update();
}
