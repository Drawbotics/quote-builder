const sign = require('electron-osx-sign');


async function signApp(path) {
  return new Promise((resolve) => {
    sign({
      app: path + '/QuoteDP.app',
      identity: 'Mac Developer: nico_moskito@hotmail.com (VR4XRKTTJG)',
    }, function done (err) { resolve() });
  });
}


module.exports = {
  signApp,
}
