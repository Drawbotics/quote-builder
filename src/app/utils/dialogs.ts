import { remote } from 'electron';


export function showError({ title, extra }: { title: string, extra?: string }) {
  const { dialog } = remote;
  dialog.showMessageBox(remote.getCurrentWindow(), {
    type: 'error',
    message: title,
    detail: extra,
    buttons: ['Close'],
  });
}


export function showMessage({
  type='info',
  title,
  message,
  onClickAction,
  onClickCancel,
  confirmButtonLabel='Ok',
  closeButtonLabel='Close',
}: {
  type?: string,
  title: string,
  message?: string,
  onClickAction?: () => void,
  onClickCancel?: () => void,
  confirmButtonLabel?: string,
  closeButtonLabel?: string,
}) {
  const { dialog } = remote;
  const buttons = onClickAction ? [confirmButtonLabel, closeButtonLabel] : [closeButtonLabel];
  dialog.showMessageBox(remote.getCurrentWindow(), {
    type,
    message: title,
    detail: message,
    buttons: buttons,
  }, (buttonId) => {
    if (buttonId === 0) {
      onClickAction ? onClickAction() : null;
    }
    else {
      onClickCancel ? onClickCancel() : null;
    }
  });
}
