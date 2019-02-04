const packager = require('electron-packager');
const fs = require('fs');


const options = {
  dir: './',
  name: 'QuoteDP',
  out: 'builds',
  icon: 'assets/icons/icon',
  extendInfo: 'assets/Info.plist',
};


async function copyFileIcon(path) {
  return new Promise((resolve, reject) => {
    fs.copyFile('assets/icons/file.icns', path + '/QuoteDP.app/Contents/Resources/file.icns', (err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
}


async function generateApplication() {
  const paths = await packager(options);
  if (paths.length > 0) {
    await copyFileIcon(paths[0]);
  }
  return paths;
}


module.exports = {
  generateApplication,
}
