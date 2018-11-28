import registerIpcListeners from './ipc';
import { setTheme, getTheme } from './themes';


async function setupTheme() {
  const theme = await getTheme();
  setTheme(theme);
}


export function bootstrap() {
  setupTheme();
  registerIpcListeners();
}
