import React from 'react';

import { showMessage } from '../utils/dialogs';


class CustomPrompt extends React.Component<{
  onConfirm: () => void,
  onCancel: () => void,
  title: string,
  message?: string,
  confirmLabel: string,
  shouldShow: boolean,
}> {
  componentDidMount() {
    this._handleOpenDialog();
  }

  componentDidUpdate(prevProps: any) {
    const { shouldShow, title } = this.props;
    const { title: prevTitle } = prevProps;
    if (shouldShow && (prevTitle === title)) {
      console.log('gonna open from update');
      this._handleOpenDialog();
    }
  }

  render() {
    return null;
  }

  _handleOpenDialog() {
    const { title, message, onConfirm, confirmLabel, onCancel } = this.props;
    showMessage({ title, message, onClickAction: onConfirm, confirmButtonLabel: confirmLabel, onClickCancel: onCancel });
  }
}


export default CustomPrompt;
