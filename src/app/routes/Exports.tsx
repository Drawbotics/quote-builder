import React from 'react';
import { css } from 'emotion';
import autobind from 'autobind-decorator';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Title from '../components/Title';
import PDFCard, { PDFCardType } from '../components/PDFCard';
import { getFilenameFromPath } from '../utils';
import { loadPDFs } from '../utils/storage/pdfs';
import { openLocally, openInExplorer } from '../utils/storage';


const styles = {
  exports: css`
    padding: calc(var(--padding) * 3);
  `,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: calc(var(--margin) * 2);
  `,
  grid: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
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
};


class Exports extends React.Component {
  state = {
    pdfs: [] as PDFCardType[],
  }

  async componentWillMount() {
    this._handleLoadPDFs();
  }

  render() {
    const { pdfs } = this.state;
    console.log(pdfs);
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
                      onClick={openLocally}
                      onClickFolder={openInExplorer}
                      onClickDelete={() => null} />
                  </div>
                </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    );
  }

  @autobind
  async _handleLoadPDFs() {
    const pdfs = await loadPDFs();
    const { files } = pdfs;
    if (files) {
      const cards = Object.values(files).map((path: string) => ({
        name: getFilenameFromPath(path) + '.pdf',
        localPath: path,
      }));
      this.setState({ pdfs: cards });
    }
    else {
      this.setState({ pdfs: [] });
    }
  }
}


export default Exports;
