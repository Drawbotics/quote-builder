import React from 'react';
import { css } from 'emotion';

import { TableRowType } from './types';


const styles = {
  header: css`
    display: flex;
    border-left: 1px solid var(--line-color);
    border-bottom: 1px solid var(--line-color);
    color: var(--grey);
    font-size: 0.85rem;
    font-weight: 600;
    transition: all var(--transition-duration) ease-in-out;
  `,
  cell: css`
    flex: 1;
    border-right: 1px solid var(--line-color);
    padding: calc(var(--padding) / 2) var(--padding);
    transition: border-color var(--transition-duration) ease-in-out;

    &:last-child {
      border-right: 0;
      text-align: right;
    }
  `,
}


const Header: React.SFC<{
  header: TableRowType,
}> = ({ header }) => {
  return (
    <div className={styles.header}>
      <div className={styles.cell}>
        {header.phase}
      </div>
      <div className={styles.cell}>
        {header.service}
      </div>
      <div className={styles.cell}>
        {header.comment}
      </div>
      <div className={styles.cell}>
        {header.price}
      </div>
    </div>
  );
}


export default Header;
