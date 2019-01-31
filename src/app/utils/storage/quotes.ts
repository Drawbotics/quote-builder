import get from 'lodash/get';

import { save, deleteUntitled, load, remove } from './index';
import { readFile, writeFile, deleteFile, getFilenameFromPath, setCurrentLocale } from '../index';
import { loadPerson } from './people';


export async function saveMapping(id: string, path: string) {
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
  let notFound = {};
  for (const id of fileIds) {
    const file = await readFile(mappings[id]).catch(() => {
      notFound[id] = mappings[id];
    });
    if (file) {
      files[id] = { ...JSON.parse(file), localPath: mappings[id] };
    }
  }
  return { files, notFound };
}


export async function getQuoteLocation(id: string) {
  const mappings = await loadMappings();
  const location = mappings[id];
  return location;
}


export async function loadQuote(id: string) {
  const location = await getQuoteLocation(id);
  const file = await readFile(location, { encoding: 'utf8' });
  const parsed = JSON.parse(file)
  setCurrentLocale(parsed.data.language);
  return {
    file: parsed,
    fileName: getFilenameFromPath(location),
  };
}


export async function saveQuote(id: string, path: string, value: any, options={} as any) {
  const { newFile=false, withMapping=true } = options;
  const lastModified = new Date();
  await writeFile(path, JSON.stringify({ ...value, lastModified }));
  if (withMapping) {
    await saveMapping(id, path);
  }
  if (newFile) {
    deleteUntitled(id);
  }
}


export async function deleteQuote(id: string) {
  try {
    const location = await getQuoteLocation(id);
    await deleteFile(location);
  }
  catch (err) {}
  await removeMapping(id);
}


export async function importQuote(path: string) {
  const file = await readFile(path);
  const quote = JSON.parse(file);
  const person = get(quote, 'data.person');
  const existingPerson = await loadPerson(person.id);
  return { existing: existingPerson, person, quote };
}
