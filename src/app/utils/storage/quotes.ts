import get from 'lodash/get';
import randomColor from 'randomcolor';

import { save, deleteUntitled, load, remove } from './index';
import {
  readFile,
  writeFile,
  deleteFile,
  getFilenameFromPath,
  setCurrentLocale,
  fileExists,
} from '../index';
import { loadPerson } from './people';
import { deleteFiles } from '../file-system';

export async function saveMapping(id: string, path: string, document?: any) {
  if (!document) {
    const rawData = await readFile(path, { encoding: 'utf8' });
    document = JSON.parse(rawData);
  }
  const coverGradient = randomColor({ count: 2, seed: document.id });
  const basicQuoteData = {
    localPath: path,
    id: document.id,
    projectName: document.data.project.projectName,
    company: document.data.project.companyName,
    lastModified: document.lastModified,
    coverGradient,
  };
  return await save('quote-mappings', id, JSON.stringify(basicQuoteData));
}

export async function loadMappings() {
  const rawMappings = await load('quote-mappings');
  if (!rawMappings) return {};
  return Object.keys(rawMappings).reduce(
    (memo, key) => ({
      ...memo,
      [key]: JSON.parse(rawMappings[key]),
    }),
    {},
  );
}

async function removeMapping(id: string) {
  return await remove('quote-mappings', id);
}

async function removeMappings(ids: Array<string>) {
  return Promise.all(ids.map(removeMapping));
}

export async function loadQuotes() {
  const mappings = await loadMappings();
  if (!mappings) return {};
  const fileIds = Object.keys(mappings);
  let files = {};
  let notFound = {};
  for (const id of fileIds) {
    const documentInfo = mappings[id];
    const exists = await fileExists(documentInfo.localPath).catch(() => {
      notFound[id] = documentInfo;
    });
    if (exists) {
      files[id] = documentInfo;
    }
  }
  return { files, notFound };
}

export async function getQuoteLocation(id: string): Promise<string> {
  const mappings = await loadMappings();
  const location = get(mappings[id], 'localPath');
  return location;
}

export async function loadQuote(id: string) {
  const location = await getQuoteLocation(id);
  const file = await readFile(location, { encoding: 'utf8' });
  const parsed = JSON.parse(file);
  setCurrentLocale(parsed.data.language);
  return {
    file: parsed,
    fileName: getFilenameFromPath(location),
  };
}

export async function saveQuote(id: string, path: string, value: any, options = {} as any) {
  const { newFile = false, withMapping = true } = options;
  const lastModified = new Date();
  const quoteData = { ...value, lastModified };
  await writeFile(path, JSON.stringify(quoteData));
  if (withMapping) {
    await saveMapping(id, path, quoteData);
  }
  if (newFile) {
    deleteUntitled(id);
  }
}

export async function deleteQuote(id: string) {
  try {
    const location = await getQuoteLocation(id);
    await deleteFile(location);
  } catch (err) {}
  await removeMapping(id);
}

export async function deleteQuotes(ids: Array<string>) {
  try {
    const locations = await Promise.all(ids.map(getQuoteLocation));
    await deleteFiles(locations);
  } catch (err) {}
  await removeMappings(ids);
}

export async function importQuote(path: string) {
  const file = await readFile(path);
  const quote = JSON.parse(file);
  const person = get(quote, 'data.person');
  const existingPerson = await loadPerson(person.id);
  return { existing: existingPerson, person, quote };
}
