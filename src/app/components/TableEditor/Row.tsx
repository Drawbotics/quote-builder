import React from 'react';
import { css } from 'emotion';

import { TableRowType } from './types';
import ActionButton from './ActionButton';


const styles = {
  row: css`
    position: relative;
    display: flex;
    border-left: 1px solid var(--line-color);
    border-bottom: 1px solid var(--line-color);
    transition: all var(--transition-duration) ease-in-out,
      background var(--transition-duration-short) ease-in-out;
    font-size: 0.9rem;
    color: var(--text-primary);
  `,
  cell: css`
    flex: 1;
    border-right: 1px solid var(--line-color);
    padding: var(--padding);
    transition: border-color var(--transition-duration) ease-in-out;

    &:last-child {
      border-right: 0;
      text-align: right;
    }
  `,
  removeIcon: css`
    position: absolute;
    right: calc(var(--margin) * -2);
    top: calc(50% - 15px);
    z-index: 9;
  `,
}


class Row extends React.Component <{
  row?: TableRowType,
  onClickAdd?: () => void,
  onClickRemove?: () => void,
}> {
  render() {
    const { row={} as TableRowType, onClickAdd, onClickRemove } = this.props;
    return (
      <div className={styles.row}>
        {onClickRemove ?
          <div className={styles.removeIcon} data-element="remove">
            <ActionButton label="—" onClick={onClickRemove} />
          </div>
        : null}
        <div className={styles.cell}>
          {row.phase}
          {onClickAdd ? <ActionButton label="＋" onClick={onClickAdd} /> : null}
        </div>
        <div className={styles.cell}>
          {row.service}
        </div>
        <div className={styles.cell}>
          {row.comment}
        </div>
        <div className={styles.cell}>
          {row.price}
        </div>
      </div>
    );
  }
}


export default Row;
