import fs from 'fs';
import { last } from 'lodash';


export function getFilenameFromPath(path: string) {
  const file = last(path.split('/')) || '';
  return file.split('.')[0];
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


export async function readFile(path: string) {
  return new Promise<any>((resolve, reject) => {
    fs.readFile(path, (error: Error, result: any) => {
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
