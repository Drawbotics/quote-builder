const context = require.context('./', false, /png/);


function nameFromFile(file: string) {
  return file.split('.png')[0].replace('./', '');
}


export default context.keys().reduce((memo, file: string) => ({ ...memo, [nameFromFile(file)]: context(file) }) , {});
