import { save, load, remove } from './index';
import { readFile, writeFile, deleteFile } from '../index';


async function saveMapping(id: string, path: string) {
  return await save('pdf-mappings', id, path);
}


async function loadMappings() {
  return await load('pdf-mappings');
}


async function removeMapping(id: string) {
  return await remove('pdf-mappings', id);
}


export async function loadPDFs() {
  const mappings = await loadMappings();
  if (! mappings) return {};
  const fileIds = Object.keys(mappings);
  let files = {};
  let notFound: string[] = [];
  for (const id of fileIds) {
    const file = await readFile(mappings[id]).catch(() => {
      notFound.push(id);
    });
    if (file) {
      files[id] = JSON.parse(file);
    }
  }
  return { files, notFound };
}


export async function getPDFLocation(id: string) {
  const mappings = await loadMappings();
  const location = mappings[id];
  return location;
}


export async function savePDF(id: string, path: string, value: any) {
  await writeFile(path, value);
  await saveMapping(id, path);
}


export async function deletePDF(id: string) {
  // TODO handle case where file is deleted outside of flow and we try to delete here (file not found)
  const location = await getPDFLocation(id);
  await deleteFile(location);
  await removeMapping(id);
}
