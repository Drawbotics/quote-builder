import * as feather from 'feather-icons';

import { setTheme, getTheme } from './themes';


function setupTheme() {
  const theme = getTheme();
  setTheme(theme);
}


function setupIcons() {
  feather.replace();
}


export function bootstrap() {
  setupTheme();
  setupIcons();
}
