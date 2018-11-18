import React from 'react';
import { css } from 'emotion';

import { TableType } from './types';
import Row from './Row';
import Header from './Header';
import Footer from './Footer';


const styles = {
  table: css`
    border-top: 1px solid var(--line-color);
    border-right: 1px solid var(--line-color);
    background: var(--tertiary);
    transition: all var(--transition-duration) ease-in-out;
  `,
  footers: css`
  `,
}


class Table extends React.Component<{
  table: TableType,
}> {
  render() {
    const { table } = this.props;
    const { header, body, footers } = table;
    return (
      <div className={styles.table}>
        <Header header={header} />
        {body.map((row, i) => (
          <Row row={row} key={i} />
        ))}
        <div className={styles.footers}>
          {footers.map((footer, i) => (
            <Footer footer={footer} key={i} />
          ))}
        </div>
      </div>
    );
  }
}


export default Table;
