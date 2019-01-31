import React, { Fragment } from 'react';
import { css, cx } from 'emotion';
import autobind from 'autobind-decorator';
import { FileText, File, Download } from 'react-feather';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { remote } from 'electron';

import Title from '../components/Title';
import Button from '../components/Button';
import QuoteCard, { QuoteCardType } from '../components/QuoteCard';
import MissingCard, { MissingQuoteType } from '../components/MissingCard';
import { documentToPDF } from '../components/DocumentEditor';
import { checkForUntitledFile, deleteUntitled, getIdFromUntitled, openInExplorer } from '../utils/storage';
import { loadQuotes, deleteQuote, saveMapping, loadQuote, importQuote, saveQuote } from '../utils/storage/quotes';
import { savePerson } from '../utils/storage/people';
import { savePDF } from '../utils/storage/pdfs';
import { showMessage, showError } from '../utils/dialogs';
import { getFilenameFromPath } from '../utils';


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
      transform: rotate3d(1,1,0,20deg);
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
  cell: css`
  `,
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
    transform: rotate3d(1,1,0,20deg);
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

      & [data-element="icon"] {
        border-color: var(--primary);
        box-shadow: 0px 0px 0px 1px var(--primary) inset;
        color: var(--primary);
      }
    }

    &:active {
      & [data-element="icon"] {
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
};


const Selection: React.SFC<{
  icon: React.ReactElement<{}>,
  label: string,
  onClick?: () => void,
}> = ({ icon, label, onClick }) => {
  return (
    <div className={styles.selection} onClick={onClick}>
      <div className={styles.icon} data-element="icon">
        {icon}
      </div>
      <div className={styles.label}>
        {label}
      </div>
    </div>
  );
};


class Quotes extends React.Component<{
  history: any,
  firstLoad: boolean,
}> {
  selections: unknown = null;
  button: unknown = null;
  page: unknown = null;

  state = {
    newSelectionOpen: false,
    quotes: [] as QuoteCardType[],
    notFound: [] as MissingQuoteType[],
  }

  async componentWillMount() {
    this._handleLoadQuotes();
  }

  componentDidMount() {
    const { firstLoad } = this.props;
    if (firstLoad) {
      this._handleUntitledDoc();
    }
    document.addEventListener('click', this._handleClickDocument);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClickDocument);
  }

  render() {
    const { history } = this.props;
    const { newSelectionOpen, quotes, notFound } = this.state;
    return (
      <div className={styles.quotes}>
        <div className={styles.header}>
          <Title>
            My quotes
          </Title>
          <div className={styles.actions}>
            <div className={styles.action}>
              <Button onClick={this._handleOpenImport} icon={<Download size={15} />} reverse>
                Import
              </Button>
            </div>
            <div className={styles.action}>
              <div ref={(selections) => this.selections = selections} className={cx(styles.newSelection, { [styles.open]: newSelectionOpen })}>
                <Selection label="From template" icon={<FileText />} onClick={() => history.push('/new?template=true')} />
                <Selection label="Blank" icon={<File />} onClick={() => history.push('/new')} />
              </div>
              <div ref={(button) => this.button = button}>
                <Button onClick={() => this.setState({ newSelectionOpen: true })}>
                  New quote
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.grid}>
          <TransitionGroup component={null}>
              {quotes.map((quote, i) => (
                <CSSTransition
                  classNames="cardsFade"
                  key={quote.id}
                  timeout={300}>
                  <div className={styles.cell}>
                    <QuoteCard
                      quote={quote}
                      onClick={() => history.push(`/${quote.id}/edit`)}
                      onClickExport={() => this._handleExportPDF(quote.id)}
                      onClickDelete={() => this._handleDeleteQuote(quote.id)}
                      onClickOpenInFinder={() => openInExplorer(quote.localPath)} />
                  </div>
                </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        {notFound.length > 0 ?
          <Fragment>
            <div className={styles.header}>
              <Title small>
                Missing quote files
              </Title>
            </div>
            <div className={styles.grid}>
              <TransitionGroup component={null}>
                  {notFound.map((file: MissingQuoteType, i) => (
                    <CSSTransition
                      classNames="cardsFade"
                      key={i}
                      timeout={300}>
                      <div>
                        <MissingCard
                          file={file}
                          onClickRelink={() => this._handleRelinkQuote(file.id)}
                          onClickDelete={() => this._handleDeleteQuote(file.id)} />
                      </div>
                    </CSSTransition>
                ))}
              </TransitionGroup>
            </div>
          </Fragment>
        : null}
      </div>
    );
  }

  @autobind
  _handleClickDocument(e: any) {
    const { newSelectionOpen } = this.state;
    if (! e.path.includes(this.selections) && newSelectionOpen && ! e.path.includes(this.button)) {
      this.setState({ newSelectionOpen: false });
    }
  }

  @autobind
  async _handleDeleteQuote(id: string) {
    await deleteQuote(id);
    this._handleLoadQuotes();
  }

  @autobind
  async _handleExportPDF(quoteId: string) {
    // TODO: dispatch action to show working (loading, exporting etc)
    const { file } = await loadQuote(quoteId)
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
  async _handleRelinkQuote(id: string) {
    const { dialog, getCurrentWindow } = remote;
    dialog.showOpenDialog(getCurrentWindow(), {
      properties: ['openFile'],
      title: 'Find quote',
      buttonLabel: 'Relink',
      filters: [{ name: 'Quotes', extensions: ['qdp'] }],
    }, async (files) => {
      if (files) {
        await saveMapping(id, files[0]);
        this._handleLoadQuotes();
      }
    });
  }

  @autobind
  async _handleOpenImport() {
    const { dialog, getCurrentWindow } = remote;
    dialog.showOpenDialog(getCurrentWindow(), {
      properties: ['openFile'],
      title: 'Import quote',
      buttonLabel: 'Import',
      filters: [{ name: 'Quotes', extensions: ['qdp'] }],
    }, async (files) => {
      if (files) {
        try {
          const { existing, person, quote } = await importQuote(files[0]);
          if (existing) {
            dialog.showMessageBox(getCurrentWindow(), {
              type: 'question',
              message: 'Existing person found',
              detail: `${existing.name} is already in your list of people. Would you like to update the document information or replace the person in your local list?`,
              buttons: [ 'Cancel', 'Replace local', 'Update document' ],
            }, async (buttonId) => {
              if (buttonId === 1) {
                await savePerson(person.id, person);
                await saveMapping(quote.id, files[0]);
                this._handleLoadQuotes();
              }
              else if (buttonId === 2) {
                quote.data.person = existing;
                await saveQuote(quote.id, files[0], quote);
                this._handleLoadQuotes();
              }
            });
          }
          else {
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
        }
        catch (error) {
          showError({ title: 'An error ocurred reading the file', extra: error.toString() });
        }
      }
    });
  }

  @autobind
  _handleUntitledDoc() {
    const { history } = this.props;
    const untitledFile = checkForUntitledFile();
    if (untitledFile) {
      const id = getIdFromUntitled(untitledFile);
      showMessage({
        title: 'You have an unsaved file',
        message: 'The application was exited while editing an unsaved file. Click continue to continue editing it, or cancel to discard it',
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
    const { files={}, notFound={} } = quotes;
    const cards = Object.values(files).map((quote: any) => ({
      id: quote.id,
      title: quote.data.project.projectName,
      subtitle: quote.data.project.companyName,
      coverImage: quote.data.project.clientLogo,
      draft: true,
      lastModified: quote.lastModified,
      localPath: quote.localPath,
    }));
    const notFoundCards = Object.keys(notFound).map((id: string) => ({
      id,
      name: getFilenameFromPath(notFound[id]) + '.qdp',
      localPath: notFound[id],
    }));
    this.setState({ quotes: cards, notFound: notFoundCards });
  }
}


export default Quotes;
