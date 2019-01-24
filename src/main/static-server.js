const express = require('express');
const path = require('path');
const getPort = require('get-port');


module.exports = function startServer() {
  return new Promise(async (resolve) => {
    const app = express();

    app.use(express.static(path.resolve(__dirname, '../../dist')));

    const port = await getPort();

    app.listen(port, () => {
      console.log(`Static server listening on port ${port}`);
      resolve(port);
    });
  });
}
