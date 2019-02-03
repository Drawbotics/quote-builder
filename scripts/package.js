const { generateApplication } = require('./generate-application');
const { generateDmg } = require('./generate-dmg');
const { generateZip } = require('./generate-zip');


async function package() {
  const appPaths = await generateApplication();
  if (appPaths.length > 0) {
    generateDmg(appPaths[0]);
    generateZip(appPaths[0]);
  }
}


package();
