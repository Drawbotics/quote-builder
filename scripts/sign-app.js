const sign = require('electron-osx-sign');


async function signApp(path) {
  return new Promise((resolve) => {
    sign({
      app: path + '/QuoteDP.app',
      identity: process.env.CERTIFICATE_IDENTITY,
    }, function done (err) { resolve() });
  });
}


module.exports = {
  signApp,
}
