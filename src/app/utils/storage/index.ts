import storage from 'electron-json-storage';
import { isEmpty, get, set, omit } from 'lodash';
import fs from 'fs';
import path from 'path';

import { deleteFile } from '../index';


export async function save(scope: string, path: string | null, value: any): Promise<any> {
  return new Promise<any>(async (resolve, reject) => {
    const currentValue = await load(scope, '') || {};
    const newValue = path ? set(currentValue, path, value) : value;
    storage.set(scope, newValue, (error: Error) => {
      if (error) {
        reject();
      }
      else {
        resolve(newValue);
      }
    });
  });
}


export async function load(scope: string, path?: string | undefined): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    storage.get(scope, (error: Error, data: any) => {
      if (error) {
        reject();
      }
      else {
        const value = isEmpty(data) ? null : (path ? get(data, path) : data);
        resolve(value);
      }
    });
  });
}


export async function remove(scope: string, path: string): Promise<any> {
  return new Promise<any>(async (resolve, reject) => {
    const currentValue = await load(scope, '') || {};
    const newValue = omit(currentValue, [path]);
    storage.set(scope, newValue, (error: Error) => {
      if (error) {
        reject();
      }
      else {
        resolve(newValue);
      }
    });
  });
}


export async function saveSetting(path: string, value: any) {
  return await save('settings', path, value);
}


export async function loadSetting(path: string) {
  return await load('settings', path);
}


export async function saveUntitled(id: string, path: string, value: any) {
  return await save(`untitled-${id}`, path, value);
}


export async function loadUntitled(id: string) {
  return await load(`untitled-${id}`);
}


export function deleteUntitled(id: string) {
  const pathToFile = path.resolve(storage.getDataPath(), `untitled-${id}.json`);
  deleteFile(pathToFile);
}


export function checkForUntitledFile() {
  const files = fs.readdirSync(storage.getDataPath());
  const untitledFiles = files.filter((fileName) => fileName.includes('untitled'));
  return untitledFiles[0];    // NOTE: we should never have more than 1
}


export function getIdFromUntitled(fileName: string) {
  return fileName.replace('untitled-', '').replace('.json', '');
}
