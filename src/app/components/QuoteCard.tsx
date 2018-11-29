import React from 'react';
import { css, cx } from 'emotion';
import moment from 'moment';
import ImagePalette from '@nicmosc/react-image-palette';


export interface QuoteCardType {
  id: string
  title: string
  subtitle: string
  lastModified: string
  coverImage: string
  draft: boolean
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
  `,
  cover: css`
    height: 100%;
    background: var(--tertiary);
    transition: all var(--transition-duration) ease-in-out;
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
  onClick?: () => void,
}> = ({ quote, onClick }) => {
  const { draft, title, subtitle, lastModified, coverImage } = quote;
  const type = draft ? 'Draft' : 'Finished';
  // const colors = ["rgb(12, 116, 188)", "rgb(108, 108, 115)"];
  return (
    <div className={styles.quoteCard} onClick={onClick}>
      <div className={styles.coverWrapper}>
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
