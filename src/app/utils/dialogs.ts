import { remote } from 'electron';


export function showError(message: string, extra?: string) {
  const { dialog } = remote;
  dialog.showMessageBox(remote.getCurrentWindow(), {
    type: 'error',
    title: 'An error occurred',
    message: message,
    detail: extra,
    buttons: ['Close'],
  }, x=>x);
}
