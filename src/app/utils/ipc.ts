import ipc from 'electron-better-ipc';

import { toggleTheme } from './themes';
import history from './history';


function createNewQuote() {
  const { location } = history;
  if (! location.pathname.includes('edit') && ! location.pathname.includes('new')) {
    history.push('/new');
  }
}


function closeFile() {
  const { location } = history;
  if (location.pathname.includes('edit')) {
    history.push('/quotes');
  }
}


export default function registerIpcListeners() {
  ipc.answerMain('toggleTheme', toggleTheme);
  ipc.answerMain('newQuote', createNewQuote);
  ipc.answerMain('closeFile', closeFile);
}
