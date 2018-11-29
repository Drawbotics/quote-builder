import { save, deleteUntitled, load, remove } from './index';
import { readFile, writeFile, deleteFile } from '../index';


async function saveMapping(id: string, path: string) {
  return await save('quote-mappings', id, path);
}


async function loadMappings() {
  return await load('quote-mappings');
}


async function removeMapping(id: string) {
  return await remove('quote-mappings', id);
}


export async function loadQuotes() {
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


export async function saveQuote(id: string, path: string, value: any) {
  const lastModified = new Date();
  await writeFile(path, JSON.stringify({ ...value, lastModified }));
  await saveMapping(id, path);
  deleteUntitled(id);
}


export async function deleteQuote(id: string) {
  const mappings = await loadMappings();
  const location = mappings[id];
  await deleteFile(location);
  await removeMapping(id);
}