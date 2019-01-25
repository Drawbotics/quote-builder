import React, { Fragment } from 'react';
import { css } from 'emotion';
import autobind from 'autobind-decorator';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { remote } from 'electron';

import Title from '../components/Title';
import PDFCard, { PDFCardType } from '../components/PDFCard';
import { getFilenameFromPath } from '../utils';
import { loadPDFs, saveMapping } from '../utils/storage/pdfs';
import { openLocally, openInExplorer } from '../utils/storage';


const styles = {
  exports: css`
    padding: calc(var(--padding) * 3);
  `,
  header: css`
    margin-bottom: var(--margin);
  `,

  grid: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
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
};


class Exports extends React.Component {
  state = {
    pdfs: [] as PDFCardType[],
    notFound: [] as PDFCardType[],
  }

  async componentWillMount() {
    this._handleLoadPDFs();
  }

  render() {
    const { pdfs, notFound } = this.state;
    return (
      <div className={styles.exports}>
        <div className={styles.header}>
          <Title>
            Exports
          </Title>
        </div>
        <div className={styles.grid}>
          <TransitionGroup component={null}>
              {pdfs.map((pdf, i) => (
                <CSSTransition
                  classNames="cardsFade"
                  key={i}
                  timeout={300}>
                  <div>
                    <PDFCard
                      pdf={pdf}
                      onClick={() => openLocally(pdf.localPath)}
                      onClickFolder={(e) => { e.stopPropagation(); openInExplorer(pdf.localPath) }}
                      onClickDelete={() => null} />
                  </div>
                </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        {notFound.length > 0 ?
          <Fragment>
            <div className={styles.header}>
              <Title small>
                Missing exports
              </Title>
            </div>
            <div className={styles.grid}>
              <TransitionGroup component={null}>
                  {notFound.map((pdf, i) => (
                    <CSSTransition
                      classNames="cardsFade"
                      key={i}
                      timeout={300}>
                      <div>
                        <PDFCard
                          pdf={pdf}
                          onClickRelink={(e) => { e.stopPropagation(); this._handleRelinkPDF(pdf.id as string) }}
                          onClickDelete={() => null} />
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
  async _handleLoadPDFs() {
    const pdfs = await loadPDFs();
    const { files={}, notFound={} } = pdfs;
    const cards = Object.values(files).map((path: string) => ({
      name: getFilenameFromPath(path) + '.pdf',
      localPath: path,
    }));
    const notFoundCards = Object.keys(notFound).map((id: string) => ({
      name: getFilenameFromPath(notFound[id]) + '.pdf',
      localPath: notFound[id],
      notFound: true,
      id,
    }));
    this.setState({ pdfs: cards, notFound: notFoundCards });
  }

  @autobind
  _handleRelinkPDF(id: string | undefined) {
    const { dialog, getCurrentWindow } = remote;
    dialog.showOpenDialog(getCurrentWindow(), {
      properties: ['openFile'],
      title: 'Find pdf',
      buttonLabel: 'Relink',
      filters: [{ name: 'PDFs', extensions: ['pdf'] }],
    }, async (files) => {
      if (files) {
        await saveMapping(id as string, files[0]);
        this._handleLoadPDFs();
      }
    });
  }
}


export default Exports;
