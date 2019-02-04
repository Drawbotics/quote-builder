const sign = require('electron-osx-sign');


function signApp(path) {
  sign({
    app: path + '/QuoteDP.app',
  }, function done (err) { });
}


module.exports = {
  signApp,
}
