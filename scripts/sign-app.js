const sign = require('electron-osx-sign');


function signApp(path) {
  sign({
    app: path + '/QuoteDP.app',
    platform: 'darwin',
    type: 'distribution',
    identity: '',
  }, function done (err) { console.log('done signing') });
}


module.exports = {
  signApp,
}
