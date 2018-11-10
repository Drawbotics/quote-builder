import storage from 'electron-json-storage';
import { isEmpty, get, set } from 'lodash';


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


export async function saveSetting(path: string, value: any) {
  return await save('settings', path, value);
}


export async function loadSetting(path: string) {
  return await load('settings', path);
}
