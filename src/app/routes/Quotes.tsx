import React from 'react';
import { css, cx } from 'emotion';
import autobind from 'autobind-decorator';
import { FileText, File, Download } from 'react-feather';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Title from '../components/Title';
import Button from '../components/Button';
import QuoteCard, { QuoteCardType } from '../components/QuoteCard';
import { checkForUntitledFile, deleteUntitled, getIdFromUntitled } from '../utils/storage';
import { loadQuotes, deleteQuote } from '../utils/storage/quotes';
import { showMessage } from '../utils/dialogs';


const styles = {
  quotes: css`
    padding: calc(var(--padding) * 3);
  `,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: calc(var(--margin) * 2);
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
    const { newSelectionOpen, quotes } = this.state;
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
                <Selection label="From template" icon={<FileText />} onClick={() => history.push('/new?template')} />
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
                      onClickDelete={() => this._handleDeleteQuote(quote.id)} />
                  </div>
                </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
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
  _handleOpenImport() {

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
    const { files } = quotes;   // NOTE: get notFound as well to display warnings
    if (files) {
      const cards = Object.values(files).map((quote: any) => ({
        id: quote.id,
        title: quote.data.project.projectName,
        subtitle: quote.data.project.companyName,
        coverImage: quote.data.project.clientLogo,
        draft: true,
        lastModified: quote.lastModified,
      }));
      this.setState({ quotes: cards });
    }
    else {
      this.setState({ quotes: [] });
    }
  }
}


export default Quotes;
