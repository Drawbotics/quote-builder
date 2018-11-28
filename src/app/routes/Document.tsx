import React from 'react';
import { parse } from 'query-string';
import { v4 } from 'uuid';
import autobind from 'autobind-decorator';
import ipc from 'electron-better-ipc';  // NOTE: not sure about using this here, should be in utils
import { remote } from 'electron';

import DocumentBoostrap from '../components/DocumentBoostrap';
import { saveUntitled, loadUntitled } from '../utils/storage';
import { saveQuote } from '../utils/storage/quotes';
import { getFilenameFromPath } from '../utils';


class Document extends React.Component<{
  match: any,
  location: any,
  history: any,
  setDocumentTitle: (v: string) => void,
}> {
  state = {
    untitled: false,
    file: {} as any,
  }

  async componentWillMount() {
    const { match, setDocumentTitle } = this.props;
    const { params } = match;
    if (params.id) {
      const untitledFile = await loadUntitled(params.id);
      if (untitledFile) {
        this.setState({ untitled: true, file: untitledFile });
        setDocumentTitle('Untitled');
      }
      else {
        // load actual file
        console.log('gonna load real file');
        setDocumentTitle('My quote file');
      }
    }
  }

  componentDidMount() {
    ipc.answerMain('saveQuote', this._handleSaveDocument);
  }

  componentWillUnmount() {
    const { setDocumentTitle } = this.props;
    setDocumentTitle('');
  }

  render() {
    const { match, location } = this.props;
    const { params } = match;

    if (! params.id) {
      return <DocumentBoostrap onFinish={this._onFinishBootstrap} fromTemplate={!! parse(location.search).template} />
    }
    else {
      return (
        <div>
          I am editing a document
        </div>
      );
    }
  }

  @autobind
  async _onFinishBootstrap(newFileData: any) {
    const { history } = this.props;
    const newId = v4();
    await saveUntitled(newId, '', { ...newFileData, id: newId });
    history.push(`/${newId}/edit`);
  }

  @autobind
  _handleSaveDocument() {
    const { setDocumentTitle } = this.props;
    const { untitled, file } = this.state;
    if (untitled) {
      const { dialog, getCurrentWindow } = remote;
      dialog.showSaveDialog(getCurrentWindow(), {
        title: 'Save quote',
        buttonLabel: 'Save',
        defaultPath: 'Untitled',
        filters: [{ name: 'Quotes', extensions: ['qdp'] }],
      }, (path) => {
        if (path) {
          saveQuote(file.id, path, file);
          this.setState({ untitled: false });
          setDocumentTitle(getFilenameFromPath(path));
        }
      });
    }
    else {

    }
  }
}


export default Document;
