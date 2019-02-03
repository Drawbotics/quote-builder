const createZip = require('electron-installer-zip');


const options = {
  out: 'builds/QuoteDP.zip',
};


function generateZip(path) {
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
