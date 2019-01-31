const packager = require('electron-packager');


const options = {
  dir: './',
  name: 'QuoteDP',
  out: 'builds',
  icon: 'assets/icons/icon',
};


async function generateApplication() {
  return await packager(options);
}


module.exports = {
  generateApplication,
}
