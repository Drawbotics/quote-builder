import React from 'react';
import { css, cx } from 'emotion';


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
  cover: css`
    height: 150px;
    background: red;
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
  draft: boolean,
}> = ({ draft }) => {
  const type = draft ? 'Draft' : 'Finished';
  const colors = ["rgb(236, 180, 36)", "rgb(4, 4, 4)"];
  return (
    <div className={styles.quoteCard}>
      <div className={styles.cover} style={{ background: `linear-gradient(to left top, ${colors[0]}, ${colors[1]})` }} />
      <div className={styles.body}>
        <div className={styles.title}>
          Groupe Lanay
        </div>
        <div className={styles.subtitle}>
          Marie Le Bourdonecckk
        </div>
        <div className={styles.footer}>
          <div className={cx(styles.type, { [styles.draft]: draft })}>
            {type}
          </div>
          <div className={styles.date}>
            23 June, 2018
          </div>
        </div>
      </div>
    </div>
  );
}


export default QuoteCard;
