import React from 'react';
import { css, keyframes, cx } from 'emotion';
import { remote } from 'electron';
import { last } from 'lodash';
import fs from 'fs';

import importIcon from '../images/import.svg';
import importIconInverse from '../images/import-inverse.svg';


const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0, 0, 0);
  }

  40%, 43% {
    transform: translate3d(0, -7px, 0);
  }

  70% {
    transform: translate3d(0, -3px, 0);
  }

  90% {
    transform: translate3d(0, -1px, 0);
  }
`;


const styles = {
  fileSelector: css`
    padding: var(--padding) calc(var(--padding) * 2);
    background: var(--tertiary);
    border: 2px solid var(--secondary);
    display: flex;
    justify-content: center;
    flex-direction: column;
    transition: all var(--transition-duration) ease-in-out;
    flex: 1;

    &:hover {
      cursor: pointer;
      border-color: var(--primary);
      transition: border-color var(--transition-duration-short) ease-in-out;

      & > [data-element="icon"] {
        animation-name: ${bounce};
      }
    }
  `,
  inverse: css`
    background: none;
    border: none;

    & [data-element="label"] {
      color: var(--white);
      font-weight: 600;
    }
  `,
  icon: css`
    height: 70%;
    max-height: 50px;
    transform-origin: center bottom;
    animation-duration: 1s;
  `,
  label: css`
    color: var(--text-primary);
    transition: color var(--transition-duration) ease-in-out;
    font-size: 0.8rem;
    white-space: nowrap;
    margin-top: calc(var(--margin) / 2);
    text-align: center;
  `,
}


export interface FileFilter {
  name: string
  extensions: string[]
}


export enum FileTypes {
  Image='Image',
  JSON='JSON',
  Text='Text',
}


export function openFileSelector(fileType: FileTypes | keyof typeof FileTypes, filters: FileFilter[], onFinish: (f: string) => void) {
  const { dialog } = remote;
  const filepaths = dialog.showOpenDialog(remote.getCurrentWindow(), {
    properties: ['openFile'],
    filters,
  });
  if (filepaths) {
    const file = filepaths[0];
    const fileExt = last(file.split('.'));
    const data = fs.readFileSync(filepaths[0], 'base64');
    if (! data) {
      alert(`An error ocurred reading the file`);
    }
    else {
      if (fileType === FileTypes.Image) {
        const dataURL = `data:image/${fileExt};base64,${data}`;
        onFinish ? onFinish(dataURL) : null;
      }
      else {
        console.warn(`File type ${fileType} not supported`);
      }
    }
  }
}


const FileSelector: React.SFC<{
  label?: string,
  onFileSelect: (f: string) => void,
  filters?: FileFilter[],
  fileType?: FileTypes | keyof typeof FileTypes,
  inverse?: boolean,
  style?: any,
}> = ({
  label,
  onFileSelect,
  filters=[{ name: 'Images', extensions: ['jpg', 'png'] }],
  fileType=FileTypes.Image,
  inverse=false,
  style,
}) => {
  return (
    <div className={cx(styles.fileSelector, { [styles.inverse]: inverse })} onClick={() => openFileSelector(fileType, filters, onFileSelect)} style={style}>
      <img src={inverse ? importIconInverse : importIcon} className={styles.icon} data-element="icon" />
      {label ? <div className={styles.label} data-element="label">
        {label}
      </div> : null}
    </div>
  );
}


export default FileSelector;
