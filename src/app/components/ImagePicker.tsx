import React from 'react';
import { css } from 'emotion';

import FileSelector, { FileTypes } from './FileSelector';


const styles = {
  imageWrapper: css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: var(--border-radius);
    min-height: 140px;
  `,
  image: css`
    max-width: 250px;
    max-height: 250px;
    object-fit: cover;
  `,
  fileUpload: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    background: var(--primary-overlay);
  `,
};


const ImagePicker: React.SFC<{
  onFileSelect: (f: string) => void,
  fileType?: FileTypes | keyof typeof FileTypes,
  image: string,
}> = ({
  onFileSelect,
  fileType,
  image,
}) => {
  return (
    <div className={styles.imageWrapper}>
      <div className={styles.fileUpload}>
        <FileSelector
          label="Click to pick image"
          onFileSelect={onFileSelect}
          fileType={fileType}
          inverse style={{ flex: 1 }} />
      </div>
      <img className={styles.image} src={image} />
    </div>
  );
};


export default ImagePicker;
