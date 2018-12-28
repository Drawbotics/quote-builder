const context = require.context('./', false, /jpg|png/);


function nameFromFile(file: string) {
  return file.split(/.(jpg|png)/)[0].replace('./', '');
}


export default context.keys().reduce((memo, file: string) => ({ ...memo, [nameFromFile(file)]: context(file) }) , {});
