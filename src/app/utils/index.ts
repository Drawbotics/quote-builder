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


export * from './image-ops';

export * from './file-system';
