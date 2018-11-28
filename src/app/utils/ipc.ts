import ipc from 'electron-better-ipc';

import { toggleTheme } from './themes';


export default function registerIpcListeners() {
  ipc.answerMain('toggleTheme', () => toggleTheme());
}
