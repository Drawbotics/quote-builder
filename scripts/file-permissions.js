const chmodr = require('chmodr');


async function makeWritable(path) {
  return new Promise((resolve, reject) => {
    chmodr(path, 666, (err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
}


module.exports = {
  makeWritable,
}
