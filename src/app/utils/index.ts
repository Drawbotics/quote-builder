import last from 'lodash/last';
import { remote } from 'electron';


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


export async function roundImage(image: string) {
  return new Promise<any>((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      if (! ctx) {
        console.warn('Canvas not supported, returning original image');
        resolve(image);
        return;
      }
      const img = new Image();
      img.src = image;
      img.onload = () => {
        ctx.save();
        ctx.scale(1,1);
        ctx.beginPath();
        ctx.arc(100, 100, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        if (img.height > img.width) {
          ctx.drawImage(img, 0, (img.height - img.width) / 2, img.width, img.width, 0, 0, canvas.width, canvas.height);
        }
        else {
          ctx.drawImage(img, (img.width - img.height) / 2, 0, img.height, img.height, 0, 0, canvas.width, canvas.height);
        }
        ctx.restore();
        const dataUrl = canvas.toDataURL();
        resolve(dataUrl);
      }
    }
    catch (err) {
      reject(err);
    }
  });
}


export * from './file-system';
