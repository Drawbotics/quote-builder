import { save } from './index';
import { writeFile } from '../index';


async function saveMapping(id: string, path: string) {
  return await save('pdf-mappings', id, path);
}


// async function loadMappings() {
//   return await load('pdf-mappings');
// }
//
//
// async function removeMapping(id: string) {
//   return await remove('pdf-mappings', id);
// }


export async function savePDF(filename: string, path: string, value: any) {
  await writeFile(path, value);
  await saveMapping(filename, path);
}
