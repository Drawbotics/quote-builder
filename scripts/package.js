const { generateApplication } = require('./generate-application');
const { generateDmg } = require('./generate-dmg');
const { generateZip } = require('./generate-zip');
const { signApp } = require('./sign-app');


async function package() {
  const appPaths = await generateApplication();
  if (appPaths.length > 0) {
    // signApp(appPaths[0]);
    generateDmg(appPaths[0]);
    generateZip(appPaths[0]);
  }
}


package();
