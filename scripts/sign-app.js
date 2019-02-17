const sign = require('electron-osx-sign');


async function signApp(path) {
  return new Promise((resolve) => {
    console.log('Signing app with', process.env.CERTIFICATE_IDENTITY);
    sign({
      app: path + '/QuoteDP.app',
      identity: process.env.CERTIFICATE_IDENTITY,
    }, function done (err) {
      if (err) {
        console.log(err);
      }
      resolve();
    });
  });
}


module.exports = {
  signApp,
}
