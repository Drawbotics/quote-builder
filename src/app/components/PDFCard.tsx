import React from 'react';
import { css, cx } from 'emotion';
import { Folder, Trash2, AlertOctagon, Link } from 'react-feather';

import pdfIcon from '../images/pdf-icon.svg';


export interface PDFCardType {
  id: string
  name: string
  localPath: string
  notFound?: boolean
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

      & [data-element="actions"], [data-element="label"] {
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
  missing: css`
    background: linear-gradient(45deg, #E3001670, #6C000770);

    & [data-element="label"] {
      display: none;
    }
  `,
  icon: css`
    flex: 1;
    padding: calc(var(--padding) * 2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);

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
    transition: color var(--transition-duration) ease-in-out;
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
  label: css`
    color: var(--white);
    position: absolute;
    bottom: calc(var(--margin) / 2);
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.9rem;
    z-index: 99;
    opacity: 0;
    transition: opacity var(--transition-duration-short) ease-in-out;
  `,
};


const PDFCard: React.SFC<{
  pdf: PDFCardType,
  onClickDelete: (e: any) => void,
  onClick?: () => void,
  onClickFolder?: (e: any) => void,
  onClickRelink?: (e: any) => void,
}> = ({ pdf, onClick, onClickDelete, onClickFolder, onClickRelink }) => {
  return (
    <div className={styles.cardWrapper} onClick={onClick}>
      <div className={cx(styles.card, { [styles.missing]: pdf.notFound })} data-element="card">
        <div className={styles.icon}>
          {pdf.notFound ? <AlertOctagon size={60} /> : <img src={pdfIcon} />}
        </div>
        <div className={styles.label} data-element="label">
          Click to view
        </div>
        <div className={styles.actions} data-element="actions">
          {pdf.notFound ?
            <div data-tooltip="Find again" className={styles.action} onClick={onClickRelink}>
              <Link size={30} />
            </div> :
            <div data-tooltip="View in Finder" className={styles.action} onClick={onClickFolder}>
              <Folder size={30} />
            </div>
          }
          <div data-tooltip="Delete" className={styles.action} onClick={onClickDelete}>
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
