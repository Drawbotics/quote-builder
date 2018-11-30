import React from 'react';
import { parse } from 'query-string';
import { v4 } from 'uuid';
import autobind from 'autobind-decorator';
import ipc from 'electron-better-ipc';  // NOTE: not sure about using this here, should be in utils
import { remote } from 'electron';
import NavigationPrompt from 'react-router-navigation-prompt';

import DocumentBoostrap from '../components/DocumentBoostrap';
import { saveUntitled, loadUntitled, deleteUntitled } from '../utils/storage';
import { saveQuote, loadQuote } from '../utils/storage/quotes';
import { getFilenameFromPath } from '../utils';
import CustomPrompt from '../components/CustomPrompt';


class Document extends React.Component<{
  match: any,
  location: any,
  history: any,
  setDocumentTitle: (v: string) => void,
  editing: boolean,
}> {
  mounted = false;

  state = {
    untitled: false,
    file: {} as any,
    hasUnsavedChanges: false,
    exiting: false,
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
        const { file, fileName } = await loadQuote(params.id);
        setDocumentTitle(fileName);
        console.log(file);
      }
    }
  }

  componentDidMount() {
    this.mounted = true;
    const { editing } = this.props;
    if (editing) {
      ipc.answerMain('saveQuote', this._handleSaveDocument);
    }
  }

  componentWillUnmount() {
    const { setDocumentTitle } = this.props;
    setDocumentTitle ? setDocumentTitle('') : null;
    this.mounted = false;
  }

  render() {
    const { untitled, hasUnsavedChanges, exiting } = this.state;
    const { match, location } = this.props;
    const { params } = match;

    if (! params.id) {
      return <DocumentBoostrap onFinish={this._onFinishBootstrap} fromTemplate={!! parse(location.search).template} />
    }
    else {
      return (
        <div>
          I am editing a document
          <NavigationPrompt
            when={(prevLoc: any, nextLoc: any) => ! nextLoc.pathname.includes('edit') && (untitled || hasUnsavedChanges)}>
            {({ onConfirm }: { onConfirm: () => void } ) => (
              <CustomPrompt
                shouldShow={! exiting && (untitled || hasUnsavedChanges)}
                message={untitled ? "This file hasn't been saved yet. Exiting will discard it. Are you sure you want to exit?" : undefined}
                title={untitled ? "Are you sure you want to exit?" : "You have unsaved changes. Are you sure you want to exit?"}
                confirmLabel="Exit"
                onConfirm={() => untitled ? this._handleDeleteUntitled(onConfirm) : this.setState({ exiting: true, }, onConfirm)} />
            )}
          </NavigationPrompt>
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
      }, async (path) => {
        if (path) {
          await saveQuote(file.id, path, file);
          this.mounted && this.setState({ untitled: false });
          setDocumentTitle(getFilenameFromPath(path));
        }
      });
    }
    else {
      // NOTE: handle saving the actual file as well
      this.setState({ hasUnsavedChanges: false });
    }
  }

  @autobind
  _handleDeleteUntitled(callback: () => void) {
    const { file } = this.state;
    deleteUntitled(file.id);
    this.setState({ exiting: true, }, callback);
  }
}


export default Document;
