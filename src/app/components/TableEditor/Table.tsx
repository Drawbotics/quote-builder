import React from 'react';
import { css } from 'emotion';
import autobind from 'autobind-decorator';

import { TableType, TableRowType, FooterRowType } from './types';
import Row from './Row';
import Header from './Header';
import Footer from './Footer';


const styles = {
  table: css`
  `,
  body: css`
    border-top: 1px solid var(--line-color);
    border-right: 1px solid var(--line-color);
    background: var(--tertiary);
    margin-bottom: var(--margin);
    transition: all var(--transition-duration) ease-in-out;
  `,
  footers: css`
    border-top: 1px solid var(--line-color);
    border-right: 1px solid var(--line-color);
    background: var(--tertiary);
    transition: all var(--transition-duration) ease-in-out;
  `,
}


class Table extends React.Component<{
  table: TableType,
  onChange: (newTable: TableType) => void,
}> {
  render() {
    const { table } = this.props;
    const { header, body, footers } = table;
    return (
      <div className={styles.table}>
        <div className={styles.body}>
          <Header header={header} />
          {body.map((row, i) => (
            <Row row={row} key={i} onClickRemove={() => this._handleModifyRow('remove', i)} />
          ))}
          <Row onClickAdd={() => undefined} />
        </div>
        <div className={styles.footers}>
          {footers.map((footer, i) => (
            <Footer footer={footer} key={i} onClickRemove={() => this._handleModifyFooter('remove', i)} />
          ))}
          <Footer onClickAdd={() => undefined} />
        </div>
      </div>
    );
  }

  @autobind
  _hanldleModifyHeader() {
    // const { onChange } = this.props;
  }

  @autobind
  _handleModifyRow(operation: string, index: number, value?: TableRowType) {
    const { onChange, table } = this.props;
    const { body } = table;
    if (operation === 'remove') {
      onChange({
        ...table,
        body: [...body.slice(0, index), ...body.slice(index + 1)],
      });
    }
  }

  @autobind
  _handleModifyFooter(operation: string, index: number, value?: FooterRowType) {
    const { onChange, table } = this.props;
    const { footers } = table;
    if (operation === 'remove') {
      onChange({
        ...table,
        footers: [...footers.slice(0, index), ...footers.slice(index + 1)],
      });
    }
  }
}


export default Table;
