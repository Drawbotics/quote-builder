import React from 'react';
import { css } from 'emotion';
import { BlobProvider } from '@react-pdf/renderer';
import { Document, Page } from 'react-pdf/dist/entry.webpack';

import MyDocument from './Document';
import ZoomControls from './ZoomControls';


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
}


class DocumentEditor extends React.Component {
  state = {
    zoom: 1.0,
  }

  render() {
    const { zoom } = this.state;
    return (
      <div className={styles.documentEditor}>
        <div className={styles.navigationBar}>
        </div>
        <div className={styles.editingBar}>
        </div>
        <ZoomControls zoom={zoom} onClickZoom={(v: number) => this.setState({ zoom: v })} />
        <div className={styles.viewer}>
          <BlobProvider document={MyDocument()}>
            {({ blob }: { blob: any }) => (
              <div>
                {blob ?
                  <Document file={blob}>
                    <Page pageNumber={2} scale={zoom} />
                  </Document> : 'Loading'}
              </div>
            )}
          </BlobProvider>
        </div>
      </div>
    );
  }
}


export default DocumentEditor;
