import { save, deleteUntitled, load } from './index';
import { readFile, writeFile } from '../index';


async function saveMapping(id: string, path: string) {
  return await save('quote-mappings', id, path);
}


async function loadMappings() {
  return await load('quote-mappings');
}


export async function loadQuotes() {
  const mappings = await loadMappings();
  // also return separately the not found files
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
  await writeFile(path, JSON.stringify(value));
  await saveMapping(id, path);
  deleteUntitled(`untitled-${id}.json`);
}
