import fs from 'fs';
import { last } from 'lodash';


declare global {
  interface Window { _internals: any; }
}

window._internals = window._internals || {};


export function getFilenameFromPath(path: string) {
  const file = last(path.split('/')) || '';
  return file.split('.')[0];
}


export function setCurrentLocale(locale: string) {
  window._internals.locale = locale;
}


export function getCurrentLocale() {
  return window._internals.locale || '';
}


export async function writeFile(path: string, value: any) {
  return new Promise<any>((resolve, reject) => {
    fs.writeFile(path, value, (error: Error) => {
      if (error) {
        reject();
      }
      else {
        resolve();
      }
    });
  });
}


export async function readFile(path: string, options={}) {
  return new Promise<any>((resolve, reject) => {
    fs.readFile(path, options, (error: Error, result: any) => {
      if (error) {
        reject(error);
      }
      else {
        resolve(result);
      }
    });
  });
}


export async function deleteFile(path: string) {
  return new Promise<any>((resolve, reject) => {
    fs.unlink(path, (error: Error) => {
      if (error) {
        reject(error);
      }
      else {
        resolve();
      }
    });
  });
}
