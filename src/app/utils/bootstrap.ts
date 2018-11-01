import * as feather from 'feather-icons';

import { setTheme } from './themes';


export function bootstrap() {
  // read settings
  // const theme = getTheme();
  setTheme('light');
  feather.replace();
}
