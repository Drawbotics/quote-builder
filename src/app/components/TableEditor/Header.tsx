import React from 'react';
import { css } from 'emotion';

import { TableRowType } from './types';


const styles = {
  header: css`
    display: flex;
    border-left: 1px solid var(--line-color);
    border-bottom: 1px solid var(--line-color);
    color: var(--grey);
    font-size: 0.9rem;
    font-weight: 600;
    transition: all var(--transition-duration) ease-in-out;
  `,
  column: css`
    flex: 1;
    border-right: 1px solid var(--line-color);
    padding: calc(var(--padding) / 2) var(--padding);
    transition: border-color var(--transition-duration) ease-in-out;

    &:last-child {
      border-right: 0;
    }
  `,
}


const Header: React.SFC<{
  header: TableRowType,
}> = ({ header }) => {
  return (
    <div className={styles.header}>
      <div className={styles.column}>
        {header.phase}
      </div>
      <div className={styles.column}>
        {header.service}
      </div>
      <div className={styles.column}>
        {header.comment}
      </div>
      <div className={styles.column}>
        {header.price}
      </div>
    </div>
  );
}


export default Header;
