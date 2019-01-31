const { generateApplication } = require('./generate-application');
const { generateDmg } = require('./generate-dmg');


async function package() {
  const appPaths = await generateApplication();
  if (appPaths.length > 0) {
    generateDmg(appPaths[0]);
  }
}


package();
