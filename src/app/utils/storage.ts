import storage from 'electron-json-storage';
import { isEmpty, get, set } from 'lodash';


export async function save(scope: string, path: string, value: any): Promise<any> {
  return new Promise<any>(async (resolve, reject) => {
    const currentValue = await load(scope, '') || {};
    const newValue = set(currentValue, path, value);
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


export async function load(scope: string, path: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    storage.get(scope, (error: Error, data: any) => {
      if (error) {
        reject();
      }
      else {
        const value = isEmpty(data) ? null : get(data, path);
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
