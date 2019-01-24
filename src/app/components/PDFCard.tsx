import React from 'react';
import { css } from 'emotion';

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
    }

    &:active {
      transform: translateY(0px);

      & [data-element="card"] {
        box-shadow: var(--box-shadow-active);
      }
    }
  `,
  card: css`
    border-radius: var(--border-radius);
    background: linear-gradient(45deg, #E30016, #6C0007);
    height: 150px;
    box-shadow: var(--box-shadow);
    display: flex;
    transition: all calc(var(--transition-duration) / 3) ease-in-out;
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
};


const PDFCard: React.SFC<{
  pdf: PDFCardType,
  onClick: () => void,
  onClickDelete: () => void,
}> = ({ pdf, onClick, onClickDelete }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card} data-element="card">
        <div className={styles.icon}>
          <img src={pdfIcon} />
        </div>
      </div>
      <div className={styles.name}>
        {pdf.name}
      </div>
    </div>
  );
};


export default PDFCard;
