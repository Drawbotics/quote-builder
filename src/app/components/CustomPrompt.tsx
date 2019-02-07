import React from 'react';
import { remote } from 'electron';


class CustomPrompt extends React.Component<{
  onConfirm: () => void,
  onCancel: () => void,
  onDiscard: () => void,
  title: string,
  message?: string,
  shouldShow: boolean,
}> {
  componentDidMount() {
    this._handleOpenDialog();
  }

  componentDidUpdate(prevProps: any) {
    const { shouldShow, title } = this.props;
    const { title: prevTitle } = prevProps;
    if (shouldShow && (prevTitle === title)) {
      this._handleOpenDialog();
    }
  }

  render() {
    return null;
  }

  _handleOpenDialog() {
    const { title, message, onConfirm, onCancel, onDiscard } = this.props;
    const { dialog, getCurrentWindow } = remote;
    dialog.showMessageBox(getCurrentWindow(), {
      type: 'info',
      message: title,
      detail: message,
      buttons: [ 'Save & exit', 'Discard', 'Cancel' ],
    }, async (buttonId) => {
      if (buttonId === 0) {
        onConfirm();
      }
      else if (buttonId === 1) {
        onDiscard();
      }
      else {
        onCancel();
      }
    });
  }
}


export default CustomPrompt;
