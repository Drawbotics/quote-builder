import React from 'react';
import { css, cx } from 'emotion';
import { BlobProvider } from '@react-pdf/renderer';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import autobind from 'autobind-decorator';

import MyDocument from './Document';
import ZoomControls from './ZoomControls';
import DraggableContainer from '../DraggableContainer';


const styles = {
  documentEditor: css`
    display: flex;
    justify-content: center;
    position: relative;
    height: 100%;
  `,
  navigationBar: css`
  `,
  editingBar: css`
  `,
  viewer: css`

  `,
  controls: css`
    position: fixed;
    bottom: var(--margin);
    right: var(--margin);
    z-index: 9;
  `,
  page: css`
    position: relative;
    margin: calc(var(--margin) * 2) 0;
    box-shadow: var(--box-shadow);
    transition: all var(--transition-duration-short) ease-in-out;

    &::after {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: var(--primary);
      pointer-events: none;
      opacity: 0;
      transition: all var(--transition-duration-short) ease-in-out;
    }
  `,
  selected: css`
    box-shadow: var(--box-shadow), 0px 0px 0px 4px var(--primary);

    &::after {
      opacity: 0.2;
    }
  `,
}


class DocumentEditor extends React.Component {
  pages = {}

  state = {
    zoom: 1.0,
    pages: 0,
    activePage: 1,
    editingPage: undefined,
  }

  componentDidMount() {
    document.addEventListener('click', this._handleClickPage);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClickPage);
  }

  render() {
    const { zoom, pages, editingPage } = this.state;
    return (
      <div className={styles.documentEditor}>
        <div className={styles.navigationBar}>
        </div>
        <div className={styles.editingBar}>
        </div>
        <div className={styles.controls}>
          <ZoomControls zoom={zoom} onClickZoom={(v: number) => this.setState({ zoom: v })} />
        </div>
        <div className={styles.viewer}>
          <DraggableContainer>
            <BlobProvider document={MyDocument()}>
              {({ blob }: { blob: any }) => (
                <div>
                  {blob ?
                    <Document file={blob} onLoadSuccess={this._onDocumentLoadSuccess}>
                      {Array(pages).fill(0).map((value, index) => (
                        <Page
                          inputRef={(page: HTMLElement) => this.pages[`page${index}`] = page}
                          className={cx(styles.page, { [styles.selected]: editingPage === index })}
                          key={index}
                          pageNumber={index + 1}
                          scale={zoom} />
                      ))}
                    </Document>
                  : 'Loading...'}
                </div>
              )}
            </BlobProvider>
          </DraggableContainer>
        </div>
      </div>
    );
  }

  @autobind
  _handleClickPage(e: MouseEvent) {
    const boundingBoxes = Object.values(this.pages).map((page: HTMLElement) => page.getBoundingClientRect());
    if (boundingBoxes.length > 0) {
      const xDelimiter = { left: boundingBoxes[0].left, right: boundingBoxes[0].left + boundingBoxes[0].width };
      if (e.clientX > xDelimiter.left && e.clientX < xDelimiter.right) {
        const yDelimiters = boundingBoxes.map((box) => ({ top: box.top, bottom: box.top + box.height }));
        let page = 0;
        for (let delimiter of yDelimiters) {
          if (e.clientY > delimiter.top && e.clientY < delimiter.bottom) {
            this.setState({ editingPage: page });
            break;
          }
          page++;
        }
      }
      else {
        this.setState({ editingPage: undefined });
      }
    }
  }

  @autobind
  _onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    this.setState({ pages: numPages });
  }
}


export default DocumentEditor;
