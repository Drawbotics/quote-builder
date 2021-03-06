import { v4 } from 'uuid';
import React, { Fragment } from 'react';
import { css, cx } from 'emotion';
import autobind from 'autobind-decorator';
import { FileText, File, Download } from 'react-feather';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { remote } from 'electron';
import ipc from 'electron-better-ipc';

import Title from '../components/Title';
import Button from '../components/Button';
import QuoteCard, { QuoteCardType } from '../components/QuoteCard';
import MissingCard, { MissingQuoteType } from '../components/MissingCard';
import Spinner from '../components/Spinner';
import { documentToPDF } from '../components/DocumentEditor';
import {
  checkForUntitledFile,
  deleteUntitled,
  getIdFromUntitled,
  openInExplorer,
} from '../utils/storage';
import {
  loadQuotes,
  deleteQuote,
  saveMapping,
  loadQuote,
  importQuote,
  saveQuote,
  deleteQuotes,
} from '../utils/storage/quotes';
import { savePerson, loadPeople } from '../utils/storage/people';
import { savePDF, loadPDFs } from '../utils/storage/pdfs';
import { showMessage, showError } from '../utils/dialogs';
import { getFilenameFromPath, setLoadingCursor, unsetLoadingCursor } from '../utils';

import emptyState from '../images/empty-state.svg';

const styles = {
  quotes: css`
    padding: calc(var(--padding) * 3);
  `,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--margin);
  `,
  actions: css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `,
  action: css`
    position: relative;
    margin-right: var(--margin);

    &:last-child {
      margin-right: 0;
    }
  `,
  grid: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    column-gap: var(--margin);
    row-gap: var(--margin);
    margin-bottom: calc(var(--margin) * 2);

    & .cardsFade-enter {
      opacity: 0;
      z-index: 1;
      transform: rotate3d(1, 1, 0, 20deg);
      transform-origin: 0 100%;
      transition: all var(--transition-duration-short) var(--transition-duration-short) ease-out;
      transition-property: opacity, transform;
    }

    & .cardsFade-enter.cardsFade-enter-active {
      opacity: 1;
      transform: none;
    }

    & .cardsFade-exit {
      opacity: 1;
      transform: none;
      transition: all var(--transition-duration-short) ease-in-out;
    }

    & .cardsFade-exit.cardsFade-exit-active {
      opacity: 0;
      transform: scale(0.9);
      transform-origin: center;
    }
  `,
  cell: css``,
  newSelection: css`
    position: absolute;
    right: 0;
    top: calc(100% + var(--margin) / 2);
    background: var(--tertiary);
    border-radius: var(--border-radius);
    padding: calc(var(--padding) * 2);
    z-index: 99;
    box-shadow: var(--box-shadow);
    display: flex;
    align-items: center;
    transition: all var(--transition-duration) ease-in-out,
      transform var(--transition-duration-short) ease-in-out,
      opacity var(--transition-duration-short) ease-in-out;
    opacity: 0;
    pointer-events: none;
    transform: rotate3d(1, 1, 0, 20deg);
    transform-origin: 100% 0;
  `,
  open: css`
    opacity: 1;
    pointer-events: auto;
    transform: none;
  `,
  selection: css`
    margin-right: calc(var(--margin) * 2);

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      cursor: pointer;

      & [data-element='icon'] {
        border-color: var(--primary);
        box-shadow: 0px 0px 0px 1px var(--primary) inset;
        color: var(--primary);
      }
    }

    &:active {
      & [data-element='icon'] {
        background: var(--primary-semi-transparent);
      }
    }
  `,
  icon: css`
    height: 150px;
    width: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: calc(var(--border-radius) / 2);
    border: 1px solid var(--line-color);
    color: var(--grey);
    transition: all var(--transition-duration) ease-in-out,
      box-shadow var(--transition-duration-short) ease-in-out,
      background var(--transition-duration-short) ease-in-out;
  `,
  label: css`
    text-align: center;
    margin-top: var(--margin);
    color: var(--text-primary);
    font-size: 0.9rem;
    transition: all var(--transition-duration) ease-in-out;
  `,
  empty: css`
    padding: calc(var(--margin) * 2) 0;
    height: calc(100% - var(--margin));
    min-height: 500px;
    width: 100%;

    > img {
      height: 100%;
      max-height: 500px;
      width: 100%;
      object-fit: contain;
      pointer-events: none;
      filter: var(--image-filter);
      transition: filter var(--transition-duration) ease-in-out;
    }
  `,
  subtitle: css`
    color: var(--grey);
    margin-bottom: calc(var(--margin) * 2);
    transition: all var(--transition-duration) ease-in-out;
    text-align: center;
    font-size: 1.1rem;
  `,
};

const Selection: React.SFC<{
  icon: React.ReactElement<{}>;
  label: string;
  onClick?: () => void;
}> = ({ icon, label, onClick }) => {
  return (
    <div className={styles.selection} onClick={onClick}>
      <div className={styles.icon} data-element="icon">
        {icon}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};

class Quotes extends React.Component<{
  history: any;
  firstLoad: boolean;
}> {
  selections: unknown = null;
  button: unknown = null;
  page: unknown = null;
  removeListener: () => void;

  state = {
    newSelectionOpen: false,
    quotes: [] as QuoteCardType[],
    notFound: [] as MissingQuoteType[],
    people: 0,
    loading: true,
  };

  async componentWillMount() {
    await this._handleLoadQuotes();
    const people = (await loadPeople()) || [];
    this.setState({ people: people.length, loading: false });
  }

  componentDidMount() {
    const { firstLoad } = this.props;
    if (firstLoad) {
      this._handleUntitledDoc();
    }
    this.removeListener = ipc.answerMain('importQuote', this._handleOpenImport);
    document.addEventListener('click', this._handleClickDocument);
  }

  componentWillUnmount() {
    this.removeListener();
    document.removeEventListener('click', this._handleClickDocument);
  }

  render() {
    const { history } = this.props;
    const { newSelectionOpen, quotes, notFound, people, loading } = this.state;
    return (
      <div className={styles.quotes}>
        <div className={styles.header}>
          <Title>My quotes</Title>
          <div className={styles.actions}>
            <div className={styles.action}>
              <Button onClick={this._handleOpenImport} icon={<Download size={15} />} reverse>
                Import
              </Button>
            </div>
            <div className={styles.action}>
              <div
                ref={(selections) => (this.selections = selections)}
                className={cx(styles.newSelection, { [styles.open]: newSelectionOpen })}>
                <Selection
                  label="From template"
                  icon={<FileText />}
                  onClick={() => history.push('/new?template=true')}
                />
                <Selection label="Blank" icon={<File />} onClick={() => history.push('/new')} />
              </div>
              <div
                data-tooltip={people === 0 ? 'Create profiles to make quotes' : null}
                ref={(button) => (this.button = button)}>
                <Button
                  disabled={people === 0}
                  onClick={() => this.setState({ newSelectionOpen: true })}>
                  New quote
                </Button>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div>
            <Spinner label="Loading quotes..." />
          </div>
        ) : null}
        {quotes.length > 0 ? (
          <div className={styles.grid}>
            <TransitionGroup component={null}>
              {quotes.map((quote, i) => (
                <CSSTransition classNames="cardsFade" key={quote.id} timeout={300}>
                  <div className={styles.cell}>
                    <QuoteCard
                      quote={quote}
                      onClick={() => history.push(`/${quote.id}/edit`)}
                      onClickExport={() => this._handleExportPDF(quote.id)}
                      onClickDelete={() => this._handleDeleteQuote(quote.id)}
                      onClickDuplicate={() => this._handleDuplicateQuote(quote.id)}
                      onClickOpenInFinder={() => openInExplorer(quote.localPath)}
                    />
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        ) : null}
        {notFound.length > 0 ? (
          <Fragment>
            <div className={styles.header} style={{ justifyContent: 'start' }}>
              <Title small>Missing quote files</Title>
              <div style={{ marginLeft: 'var(--margin)' }}>
                <Button flat small onClick={this._handleClearMissing}>
                  Clear missing
                </Button>
              </div>
            </div>
            <div className={styles.grid}>
              <TransitionGroup component={null}>
                {notFound.map((file: MissingQuoteType, i) => (
                  <CSSTransition classNames="cardsFade" key={i} timeout={300}>
                    <div>
                      <MissingCard
                        file={file}
                        onClickRelink={() => this._handleRelinkQuote(file.id)}
                        onClickDelete={() => this._handleDeleteQuote(file.id)}
                      />
                    </div>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </div>
          </Fragment>
        ) : null}
        {loading === false && quotes.length === 0 && notFound.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.subtitle}>
              You don't have any quotes. If you haven't, create a person profile to start making
              quotes!
            </div>
            <img src={emptyState} />
          </div>
        ) : null}
      </div>
    );
  }

  @autobind
  _handleClickDocument(e: any) {
    const { newSelectionOpen } = this.state;
    if (!e.path.includes(this.selections) && newSelectionOpen && !e.path.includes(this.button)) {
      this.setState({ newSelectionOpen: false });
    }
  }

  @autobind
  _handleClearMissing() {
    const { notFound } = this.state;
    showMessage({
      type: 'warning',
      title: 'Are you sure you want to delete all missing quotes?',
      message: 'You can always re-import a quote later',
      onClickAction: async () => {
        setLoadingCursor();
        await deleteQuotes(notFound.map((notFound) => notFound.id));
        unsetLoadingCursor();
        this._handleLoadQuotes();
      },
      confirmButtonLabel: 'Delete',
      closeButtonLabel: 'Cancel',
    });
  }

  @autobind
  _handleDeleteQuote(id: string) {
    showMessage({
      type: 'warning',
      title: 'Are you sure you want to delete this quote?',
      message: 'Deleting will also remove it from your computer',
      onClickAction: async () => {
        await deleteQuote(id);
        this._handleLoadQuotes();
      },
      confirmButtonLabel: 'Delete',
      closeButtonLabel: 'Cancel',
    });
  }

  @autobind
  async _handleExportPDF(quoteId: string) {
    const { file, fileName } = await loadQuote(quoteId);
    const pdf = await documentToPDF(file);
    const { dialog, getCurrentWindow } = remote;
    dialog.showSaveDialog(
      getCurrentWindow(),
      {
        title: 'Export quote',
        buttonLabel: 'Export',
        defaultPath: fileName != null ? fileName : 'Untitled',
        filters: [{ name: 'Quote exports', extensions: ['pdf'] }],
      },
      async (path) => {
        if (path) {
          setLoadingCursor();
          await savePDF(`${file.id}-${getFilenameFromPath(path)}`, path, pdf);
          unsetLoadingCursor();
        }
      },
    );
  }

  @autobind
  async _handleDuplicateQuote(quoteId: string) {
    const { file, fileName } = await loadQuote(quoteId);
    const { dialog, getCurrentWindow } = remote;
    dialog.showSaveDialog(
      getCurrentWindow(),
      {
        title: 'Duplicate quote',
        buttonLabel: 'Save',
        defaultPath: `${fileName}-copy`,
        filters: [{ name: 'Quotes', extensions: ['qdp'] }],
      },
      async (path) => {
        if (path) {
          const newId = v4();
          setLoadingCursor();
          await saveQuote(newId, path, { ...file, id: newId });
          unsetLoadingCursor();
          this._handleLoadQuotes();
        }
      },
    );
  }

  @autobind
  async _handleRelinkQuote(id: string) {
    const { dialog, getCurrentWindow } = remote;
    dialog.showOpenDialog(
      getCurrentWindow(),
      {
        properties: ['openFile'],
        title: 'Find quote',
        buttonLabel: 'Relink',
        filters: [{ name: 'Quotes', extensions: ['qdp'] }],
      },
      async (files) => {
        if (files) {
          await saveMapping(id, files[0]);
          this._handleLoadQuotes();
        }
      },
    );
  }

  @autobind
  async _handleOpenImport() {
    const { dialog, getCurrentWindow } = remote;
    dialog.showOpenDialog(
      getCurrentWindow(),
      {
        properties: ['openFile'],
        title: 'Import quote',
        buttonLabel: 'Import',
        filters: [{ name: 'Quotes', extensions: ['qdp'] }],
      },
      async (files) => {
        if (files) {
          try {
            const { existing, person, quote } = await importQuote(files[0]);
            if (existing) {
              dialog.showMessageBox(
                getCurrentWindow(),
                {
                  type: 'question',
                  message: 'Existing person found',
                  detail: `${existing.name} is already in your list of people. Would you like to update the document information or replace the person in your local list?`,
                  buttons: ['Cancel', 'Replace local', 'Update document'],
                },
                async (buttonId) => {
                  if (buttonId === 1) {
                    await savePerson(person.id, person);
                    await saveMapping(quote.id, files[0]);
                    this._handleLoadQuotes();
                  } else if (buttonId === 2) {
                    quote.data.person = existing;
                    await saveQuote(quote.id, files[0], quote);
                    this._handleLoadQuotes();
                  }
                },
              );
            } else {
              showMessage({
                title: 'New person found',
                message: `${person.name} is not currently in your list of people. It will be added automatically after importing.`,
                closeButtonLabel: 'Cancel',
                onClickAction: async () => {
                  await savePerson(person.id, person);
                  await saveMapping(quote.id, files[0]);
                  this._handleLoadQuotes();
                },
              });
            }
          } catch (error) {
            showError({ title: 'An error ocurred reading the file', extra: error.toString() });
          }
        }
      },
    );
  }

  @autobind
  _handleUntitledDoc() {
    const { history } = this.props;
    const untitledFile = checkForUntitledFile();
    if (untitledFile) {
      const id = getIdFromUntitled(untitledFile);
      showMessage({
        title: 'You have an unsaved file',
        message:
          'The application was exited while editing an unsaved file. Click continue to continue editing it, or cancel to discard it',
        onClickAction: () => history.push(`/${id}/edit`),
        onClickCancel: () => deleteUntitled(id),
        confirmButtonLabel: 'Continue',
        closeButtonLabel: 'Cancel',
      });
    }
  }

  @autobind
  async _handleLoadQuotes() {
    const quotes = await loadQuotes();
    const pdfs = await loadPDFs();
    const { files = {}, notFound = {} } = quotes;
    const { files: pdfFiles = {} } = pdfs;
    const cards = Object.values(files).map((quote: any) => ({
      id: quote.id,
      title: quote.projectName,
      subtitle: quote.company,
      draft: !Object.keys(pdfFiles).find((k) => k.includes(quote.id)),
      lastModified: quote.lastModified,
      localPath: quote.localPath,
      coverGradient: quote.coverGradient,
    }));
    const notFoundCards = Object.values(notFound).map((file: any) => ({
      id: file.id,
      name: getFilenameFromPath(file.localPath) + '.qdp',
      localPath: file.localPath,
    }));
    this.setState({ quotes: cards, notFound: notFoundCards });
  }
}

export default Quotes;
