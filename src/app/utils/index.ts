import last from 'lodash/last';
import { remote } from 'electron';
import sharp from 'sharp';


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
  return window._internals.locale || 'EN';
}


const editingMenuIds = ['saveQuote', 'saveQuoteAs', 'exportToPDF', 'closeFile'];


export function toggleMenuItems(route: string) {
  const menu = remote.Menu.getApplicationMenu();
  if (menu) {
    editingMenuIds.map((id) => {
      const exportItem = menu.getMenuItemById(id);
      if (route.includes('edit')) {
        exportItem.enabled = true;
      }
      else {
        exportItem.enabled = false;
      }
    });
  }
}


const roundedCorners = Buffer.from(
  '<svg><rect x="0" y="0" width="200" height="200" rx="200" ry="200"/></svg>'
);


export async function roundImage(image: string) {
  return new Promise<any>((resolve, reject) => {
    try {
      const uri = image.split(';base64,').pop() as string;
      const imageBuffer = Buffer.from(uri, 'base64');
      sharp(imageBuffer)
        .resize(200, 200)
        .overlayWith(roundedCorners, { cutout: true })
        .png()
        .toBuffer()
        .then((data) => {
        const roundedImage = 'data:image/png;base64,' + data.toString('base64');
        resolve(roundedImage);
      });
    }
    catch (err) {
      reject(err);
    }
  });
}


export * from './file-system';
