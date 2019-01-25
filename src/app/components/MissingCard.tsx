import React from 'react';
import { css } from 'emotion';
import { Trash2, AlertOctagon, Link } from 'react-feather';


export interface MissingQuoteType {
  id: string
  name: string
  localPath: string
}


const styles = {
  missingCard: css`
    transition: all calc(var(--transition-duration) / 3) ease-in-out;

    &:hover {
      transform: translateY(-1px);

      & [data-element="card"] {
        box-shadow: var(--box-shadow-hover);
      }

      & [data-element="actions"] {
        opacity: 1;
      }
    }
  `,
  card: css`
    position: relative;
    border-radius: var(--border-radius);
    background: var(--red);
    height: 100px;
    box-shadow: var(--box-shadow);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all calc(var(--transition-duration) / 3) ease-in-out;
    overflow: hidden;
  `,
  icon: css`
    color: var(--white);
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
      cursor: pointer;
      transform: scale(1.1);
    }
  `,
};


const MissingCard: React.SFC<{
  file: MissingQuoteType,
  onClickDelete: () => void,
  onClickRelink: () => void,
}> = ({ file, onClickDelete, onClickRelink }) => {
  return (
    <div className={styles.missingCard}>
      <div className={styles.card} data-element="card">
        <div className={styles.icon}>
          <AlertOctagon size={60} />
        </div>
        <div className={styles.actions} data-element="actions">
          <div className={styles.action} onClick={onClickRelink}>
            <Link size={30} />
          </div>
          <div className={styles.action} onClick={onClickDelete}>
            <Trash2 size={30} />
          </div>
        </div>
      </div>
      <div className={styles.name}>
        {file.name}
      </div>
    </div>
  );
};


export default MissingCard;
