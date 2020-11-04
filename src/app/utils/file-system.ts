import fs from 'fs';

export async function writeFile(path: string, value: any) {
  return new Promise<any>((resolve, reject) => {
    fs.writeFile(path, value, (error: Error) => {
      if (error) {
        reject();
      } else {
        resolve();
      }
    });
  });
}

export async function readFile(path: string, options = {}) {
  return new Promise<any>((resolve, reject) => {
    fs.readFile(path, options, (error: Error, result: any) => {
      if (error) {
        reject(error);
      } else {
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
      } else {
        resolve();
      }
    });
  });
}

export async function deleteFiles(filePaths: Array<string>) {
  return Promise.all(filePaths.map(deleteFile));
}

export async function fileExists(path: string) {
  return new Promise<any>((resolve, reject) => {
    fs.access(path, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}
