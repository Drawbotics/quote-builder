import React from 'react';
import { parse } from 'query-string';
import { v4 } from 'uuid';
import autobind from 'autobind-decorator';
import ipc from 'electron-better-ipc';  // NOTE: not sure about using this here, should be in utils
import { remote } from 'electron';
import NavigationPrompt from 'react-router-navigation-prompt';

import DocumentBoostrap from '../components/DocumentBoostrap';
import { saveUntitled, loadUntitled, deleteUntitled } from '../utils/storage';
import { saveQuote, loadQuote, getQuoteLocation } from '../utils/storage/quotes';
import { savePDF } from '../utils/storage/pdfs';
import { getFilenameFromPath } from '../utils';
import CustomPrompt from '../components/CustomPrompt';
import DocumentEditor, { documentToPDF } from '../components/DocumentEditor';


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
    hasUnsavedChanges: true,
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
        this.setState({ file });
      }
    }
  }

  componentDidMount() {
    this.mounted = true;
    const { editing } = this.props;
    if (editing) {
      ipc.answerMain('saveQuote', this._handleSaveDocument);
      ipc.answerMain('saveQuoteAs', this._handleSaveAs);
      ipc.answerMain('exportToPDF', this._handleExportToPDF);
    }
  }

  componentWillUnmount() {
    const { setDocumentTitle } = this.props;
    setDocumentTitle ? setDocumentTitle('') : null;
    this.mounted = false;
  }

  render() {
    const { untitled, hasUnsavedChanges, exiting, file } = this.state;
    const { match, location } = this.props;
    const { params } = match;

    if (! params.id) {
      return <DocumentBoostrap onFinish={this._onFinishBootstrap} fromTemplate={!! parse(location.search).template} />
    }
    else {
      return (
        <div>
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
          <DocumentEditor document={file} />
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
  async _handleSaveDocument() {
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
          await saveQuote(file.id, path, file, { newFile: true });
          this.mounted && this.setState({ untitled: false });
          setDocumentTitle(getFilenameFromPath(path));
        }
      });
    }
    else {
      const location = await getQuoteLocation(file.id);
      await saveQuote(file.id, location, file);
      // TODO add button to save + indicator for unsaved changes
      this.setState({ hasUnsavedChanges: false });
    }
  }

  @autobind
  _handleSaveAs() {
    const { untitled, file } = this.state;
    if (! untitled) {
      const { dialog, getCurrentWindow } = remote;
      dialog.showSaveDialog(getCurrentWindow(), {
        title: 'Save quote as',
        buttonLabel: 'Save',
        defaultPath: 'Untitled',
        filters: [{ name: 'Quotes', extensions: ['qdp'] }],
      }, async (path) => {
        if (path) {
          await saveQuote(file.id, path, file, { newFile: false, withMapping: false });
        }
      });
    }
  }

  @autobind
  _handleDeleteUntitled(callback: () => void) {
    const { file } = this.state;
    deleteUntitled(file.id);
    this.setState({ exiting: true, }, callback);
  }

  @autobind
  async _handleExportToPDF() {
    const { file } = this.state;
    const pdf = await documentToPDF(file);
    const { dialog, getCurrentWindow } = remote;
    dialog.showSaveDialog(getCurrentWindow(), {
      title: 'Export quote',
      buttonLabel: 'Export',
      defaultPath: 'Untitled',
      filters: [{ name: 'Quote exports', extensions: ['pdf'] }],
    }, async (path) => {
      if (path) {
        await savePDF(`${file.id}-${getFilenameFromPath(path)}`, path, pdf);
      }
    });
  }
}


export default Document;
