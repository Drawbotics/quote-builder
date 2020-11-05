const rimraf = require('rimraf');


function removeCache(path) {
  const cache = path + '/QuoteDP.app/Contents/Resources/app/node_modules/.cache';
  console.log('Removing cache at ', cache);
  rimraf.sync(cache);
}


module.exports = {
  removeCache,
}
