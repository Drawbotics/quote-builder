import { save, load, remove } from './index';
import { writeFile, deleteFile, fileExists } from '../index';


export async function saveMapping(id: string, path: string) {
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
  let notFound = {};
  for (const id of fileIds) {
    const exists = await fileExists(mappings[id]).catch(() => {
      notFound[id] = mappings[id];
    });
    if (exists) {
      files[id] = mappings[id];
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
  try {
    const location = await getPDFLocation(id);
    await deleteFile(location);
  }
  catch (err) {}
  await removeMapping(id);
}
