import { setTheme, getTheme } from './themes';


function setupTheme() {
  const theme = getTheme();
  setTheme(theme);
}


export function bootstrap() {
  setupTheme();
}
