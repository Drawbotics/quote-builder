import React from 'react';
import { css } from 'emotion';
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
    margin: calc(var(--margin) * 2) 0;
    box-shadow: var(--box-shadow);
  `,
}


class DocumentEditor extends React.Component {
  state = {
    zoom: 1.0,
    pages: 0,
    activePage: 1,
  }

  render() {
    const { zoom, pages } = this.state;
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
                        <Page className={styles.page} key={index} pageNumber={index + 1} scale={zoom} />
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
  _onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    this.setState({ pages: numPages });
  }
}


export default DocumentEditor;
