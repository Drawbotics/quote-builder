import React from 'react';
import { css, keyframes } from 'emotion';

import importIcon from '../images/import.svg';


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
  icon: css`
    height: 70%;
    transform-origin: center bottom;
    animation-duration: 1s;
  `,
  label: css`
    color: var(--text-primary);
    transition: color var(--transition-duration) ease-in-out;
    font-size: 0.9rem;
    white-space: nowrap;
    margin-top: calc(var(--margin) / 2);
  `,
}


const FileSelector: React.SFC<{
  label?: string,
  onFileSelect: (v: string[]) => void,
}> = ({
  label,
  onFileSelect,
}) => {
  return (
    <div className={styles.fileSelector} onClick={undefined}>
      <img src={importIcon} className={styles.icon} data-element="icon" />
      {label ? <div className={styles.label}>
        {label}
      </div> : null}
    </div>
  );
}


export default FileSelector;
