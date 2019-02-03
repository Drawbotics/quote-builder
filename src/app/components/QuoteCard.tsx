import React from 'react';
import { css, cx } from 'emotion';
import moment from 'moment';
import ImagePalette from '@nicmosc/react-image-palette';
import { Trash2, Share, Folder } from 'react-feather';


export interface QuoteCardType {
  id: string
  title: string
  subtitle: string
  lastModified: string
  coverImage: string
  draft: boolean
  localPath: string
}


const styles = {
  quoteCard: css`
    border-radius: var(--border-radius);
    background: var(--tertiary);
    transition: all calc(var(--transition-duration) / 3) ease-in-out,
      background var(--transition-duration) ease-in-out;
    box-shadow: var(--box-shadow);
    overflow: hidden;

    &:hover {
      cursor: pointer;
      box-shadow: var(--box-shadow-hover);
      transform: translateY(-1px);
    }

    &:active {
      box-shadow: var(--box-shadow-active);
      transform: translateY(0px);
    }
  `,
  coverWrapper: css`
    height: 150px;
    position: relative;

    &:hover {
      & [data-element="overlay"] {
        opacity: 1;
        pointer-events: auto;
      }

      & [data-element="action"] {
        transform: scale(1);
      }
    }
  `,
  cover: css`
    height: 100%;
    background: var(--tertiary);
    transition: all var(--transition-duration) ease-in-out;
  `,
  overlay: css`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: var(--primary-overlay);
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--transition-duration-short) ease-in-out;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: calc(var(--padding) / 2);
  `,
  action: css`
    color: var(--white);
    transform: scale(0);

    &:hover {
      cursor: pointer;
      transform: scale(1.05) !important;
    }
  `,
  actionGroup: css`
    display: flex;
    align-items: center;

    & > [data-element="action"] {
      margin-right: var(--margin);
    }
  `,
  body: css`
    padding: var(--padding);
  `,
  title: css`
    color: var(--text-primary);
    transition: color var(--transition-duration) ease-in-out;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  subtitle: css`
    color: var(--grey);
    font-size: 0.8rem;
    transition: color var(--transition-duration) ease-in-out;
    margin-top: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  footer: css`
    margin-top: calc(var(--margin) * 1.5);
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  type: css`
    position: relative;
    font-size: 0.8rem;
    color: var(--text-primary);
    transition: color var(--transition-duration) ease-in-out;
    margin-left: var(--margin);

    &::after {
      content: ' ';
      position: absolute;
      height: 11px;
      width: 11px;
      left: calc(var(--margin) * -1);
      top: 50%;
      transform: translateY(-50%);
      border-radius: 10000px;
      background: var(--primary);
    }
  `,
  draft: css`
    &::after {
      background: var(--orange);
    }
  `,
  date: css`
    font-size: 0.8rem;
    color: var(--grey);
    transition: color var(--transition-duration) ease-in-out;
  `,
};


const QuoteCard: React.SFC<{
  quote: QuoteCardType,
  onClick: () => void,
  onClickDelete: () => void,
  onClickExport: () => void,
  onClickOpenInFinder: () => void,
}> = ({ quote, onClick, onClickDelete, onClickExport, onClickOpenInFinder }) => {
  const { draft, title, subtitle, lastModified, coverImage } = quote;
  const type = draft ? 'Draft' : 'Exported';
  return (
    <div className={styles.quoteCard} onClick={onClick}>
      <div className={styles.coverWrapper}>
        <div className={styles.overlay} data-element="overlay">
          <div className={styles.actionGroup}>
            <div className={styles.action} data-element="action" onClick={(e) => { e.stopPropagation(); onClickExport() }}>
              <Share size={25} />
            </div>
            <div className={styles.action} data-element="action" onClick={(e) => { e.stopPropagation(); onClickOpenInFinder() }}>
              <Folder size={25} />
            </div>
          </div>
          <div className={styles.action} data-element="action" onClick={(e) => { e.stopPropagation(); onClickDelete() }}>
            <Trash2 size={25} />
          </div>
        </div>
        <ImagePalette image={coverImage}>
          {({ backgroundColor, alternativeColor }: { backgroundColor: string, alternativeColor: string }) => (
            <div className={styles.cover} style={{ background: `linear-gradient(to left top, ${backgroundColor}, ${alternativeColor})` }} />
          )}
        </ImagePalette>
      </div>
      <div className={styles.body}>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.subtitle}>
          {subtitle}
        </div>
        <div className={styles.footer}>
          <div className={cx(styles.type, { [styles.draft]: draft })}>
            {type}
          </div>
          <div className={styles.date}>
            {moment(lastModified).format('Do MMM, YYYY')}
          </div>
        </div>
      </div>
    </div>
  );
}


export default QuoteCard;
