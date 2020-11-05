const createZip = require('electron-installer-zip');
const { exec } = require('child_process');


const options = {
  out: 'builds/QuoteDP-mac.zip',
};


function generateZip(path) {
  console.log('Generating zip');
  createZip({
    ...options,
    dir: path + '/QuoteDP.app',
  }, function(err, res) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
}


module.exports = {
  generateZip,
}
