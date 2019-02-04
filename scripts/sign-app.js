const sign = require('electron-osx-sign');


function signApp(path) {
  sign({
    app: path + '/QuoteDP.app',
  }, function done (err) { console.log('done signing') });
}


module.exports = {
  signApp,
}
