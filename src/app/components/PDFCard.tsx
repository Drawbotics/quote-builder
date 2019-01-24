import React from 'react';
import { css } from 'emotion';
import { Folder, Trash2 } from 'react-feather';

import pdfIcon from '../images/pdf-icon.svg';


export interface PDFCardType {
  name: string
  localPath: string
}


const styles = {
  cardWrapper: css`
    transition: all calc(var(--transition-duration) / 3) ease-in-out;

    &:hover {
      cursor: pointer;
      transform: translateY(-1px);

      & [data-element="card"] {
        box-shadow: var(--box-shadow-hover);
      }

      & [data-element="actions"] {
        opacity: 1;
      }
    }

    &:active {
      transform: translateY(0px);

      & [data-element="card"] {
        box-shadow: var(--box-shadow-active);
      }
    }
  `,
  card: css`
    position: relative;
    border-radius: var(--border-radius);
    background: linear-gradient(45deg, #E30016, #6C0007);
    height: 150px;
    box-shadow: var(--box-shadow);
    display: flex;
    transition: all calc(var(--transition-duration) / 3) ease-in-out;
    overflow: hidden;
  `,
  icon: css`
    flex: 1;
    padding: calc(var(--padding) * 2);

    & > img {
      width: 100%;
      height: 100%;
      max-height: 100px;
      object-fit: contain;
    }
  `,
  name: css`
    color: var(--text-primary);
    text-align: center;
    margin-top: var(--margin);
  `,
  actions: css`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-around;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    background: rgba(0, 0, 0, 0.4);
    transition: all var(--transition-duration-short) ease-in-out;
  `,
  action: css`
    color: var(--white);

    &:hover {
      transform: scale(1.1);
    }
  `,
};


const PDFCard: React.SFC<{
  pdf: PDFCardType,
  onClick: (path: string) => void,
  onClickFolder: (path: string) => void,
  onClickDelete: () => void,
}> = ({ pdf, onClick, onClickDelete, onClickFolder }) => {
  return (
    <div className={styles.cardWrapper} onClick={() => onClick(pdf.localPath)}>
      <div className={styles.card} data-element="card">
        <div className={styles.icon}>
          <img src={pdfIcon} />
        </div>
        <div className={styles.actions} data-element="actions">
          <div className={styles.action} onClick={(e) => { e.stopPropagation(); onClickFolder(pdf.localPath) }}>
            <Folder size={30} />
          </div>
          <div className={styles.action}>
            <Trash2 size={30} />
          </div>
        </div>
      </div>
      <div className={styles.name}>
        {pdf.name}
      </div>
    </div>
  );
};


export default PDFCard;
