const createDMG = require('electron-installer-dmg');


const options = {
  out: 'builds',
  name: 'QuoteDP',
};


function generateDmg(path) {
  createDMG({
    ...options,
    appPath: path + '/' + options.name + '.app',
  }, function done (err) { });
}


module.exports = {
  generateDmg,
}
