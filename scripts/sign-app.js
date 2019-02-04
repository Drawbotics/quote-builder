const sign = require('electron-osx-sign');


function signApp(path) {
  sign({
    app: path + '/QuoteDP.app',
    platform: 'darwin',
    type: 'distribution',
    identity: 'Mac Developer: nico_moskito@hotmail.com (VR4XRKTTJG)',
  }, function done (err) { console.log('done signing') });
}


module.exports = {
  signApp,
}
