import ipc from 'electron-better-ipc';

import { toggleTheme } from './themes';
import history from './history';
import { loadMappings as loadQuoteMappings } from './storage/quotes';
import { showMessage } from './dialogs';


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


async function openFile(path: string) {
  const mappings = await loadQuoteMappings() || {};
  const existingQuoteId = Object.keys(mappings).find((key) => mappings[key] === path);
  if (!! existingQuoteId) {
    history.push(`/${existingQuoteId}/edit`);
  }
  else {
    showMessage({
      title: 'Quote has not been imported',
      message: 'The quote file you\'re trying to open does not exist in the application registry yet. To modify this file please import it first.',
    });
  }
}


export default function registerIpcListeners() {
  ipc.answerMain('toggleTheme', toggleTheme);
  ipc.answerMain('newQuote', createNewQuote);
  ipc.answerMain('closeFile', closeFile);
  ipc.answerMain('openFile', openFile);
}
