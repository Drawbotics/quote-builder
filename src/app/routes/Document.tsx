import React from 'react';
import { parse } from 'query-string';
import { v4 } from 'uuid';
import autobind from 'autobind-decorator';
import ipc from 'electron-better-ipc';  // NOTE: not sure about using this here, should be in utils
import { remote } from 'electron';
import NavigationPrompt from 'react-router-navigation-prompt';
import { css, cx, keyframes } from 'emotion';
import { Save } from 'react-feather';

import DocumentBoostrap from '../components/DocumentBoostrap';
import { saveUntitled, loadUntitled, deleteUntitled } from '../utils/storage';
import { saveQuote, loadQuote, getQuoteLocation } from '../utils/storage/quotes';
import { savePDF } from '../utils/storage/pdfs';
import { getFilenameFromPath } from '../utils';
import CustomPrompt from '../components/CustomPrompt';
import DocumentEditor, { documentToPDF } from '../components/DocumentEditor';


const showAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;


const styles = {
  saveContainer: css`
    position: fixed;
    top: 15px;
    right: 15px;
    z-index: 99999;
    animation: ${showAnimation} 0s 0.3s forwards;
    opacity: 0;
  `,
  save: css`
    position: relative;
    color: var(--text-primary);
    transition: all var(--transition-duration) ease-in-out;

    &:hover {
      color: var(--primary);
    }
  `,
  disabled: css`
    pointer-events: none;
    opacity: 0.5;

    & [data-element="indicator"] {
      display: none;
    }
  `,
  unsavedChanges: css`
    position: absolute;
    top: -3px;
    right: -3px;
    height: 10px;
    width: 10px;
    background: var(--red);
    border-radius: 1000px;
  `,
};


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

  componentWillMount() {
    this._loadDocument();
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
    const { match, location, history } = this.props;
    const { params } = match;
    if (! params.id) {
      return <DocumentBoostrap onFinish={this._onFinishBootstrap} fromTemplate={!! parse(location.search).template} />
    }
    else {
      return (
        <div>
          <NavigationPrompt
            when={(prevLoc: any, nextLoc: any) => ! nextLoc.pathname.includes('edit') && (untitled || hasUnsavedChanges)}>
            {({ onConfirm, onCancel }: { onConfirm: () => void, onCancel: () => void } ) => (
              <CustomPrompt
                onCancel={onCancel}
                shouldShow={! exiting && (untitled || hasUnsavedChanges)}
                message={untitled ? "This file hasn't been saved yet. Are you sure you want to exit?" : undefined}
                title={untitled ? "Are you sure you want to exit?" : "You have unsaved changes. Are you sure you want to exit?"}
                onDiscard={() => untitled ? this._handleDeleteUntitled(onConfirm) : this.setState({ exiting: true }, onConfirm)}
                onConfirm={() => this._handleSaveDocument(() => this.setState({ exiting: true }, onConfirm))} />
            )}
          </NavigationPrompt>
          <DocumentEditor document={file} onChange={this._setHasUnsavedChanges} location={location} history={history} />
          <div className={styles.saveContainer}>
            <div className={cx(styles.save, { [styles.disabled]: ! hasUnsavedChanges })} onClick={() => this._handleSaveDocument()}>
              <div className={styles.unsavedChanges} data-element="indicator" />
              <Save size={20} />
            </div>
          </div>
        </div>
      );
    }
  }

  @autobind
  async _loadDocument() {
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

  @autobind
  async _onFinishBootstrap(newFileData: any) {
    const { history } = this.props;
    const newId = v4();
    await saveUntitled(newId, '', { ...newFileData, id: newId });
    history.push(`/${newId}/edit`);
    this._loadDocument();
  }

  @autobind
  async _handleSaveDocument(onSave?: () => void) {
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
          if (onSave) {
            onSave();
          }
          else {
            this.mounted && this.setState({ untitled: false });
            setDocumentTitle(getFilenameFromPath(path));
          }
        }
      });
    }
    else {
      const location = await getQuoteLocation(file.id);
      await saveQuote(file.id, location, file);
      this.setState({ hasUnsavedChanges: false });
      if (onSave) onSave();
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

  @autobind
  _setHasUnsavedChanges() {
    this.setState({ hasUnsavedChanges: true });
  }
}


export default Document;
