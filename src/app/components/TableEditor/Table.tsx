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
          <Header header={header} onChange={this._hanldleModifyHeader} />
          {body.map((row, i) => (
            <Row
              row={row}
              key={i}
              onClickRemove={() => this._handleModifyRow('remove', i)}
              onChange={(v) => this._handleModifyRow('modify', i, v)} />
          ))}
          <Row onClickAdd={() => this._handleModifyRow('add')} />
        </div>
        <div className={styles.footers}>
          {footers.map((footer, i) => (
            <Footer
              key={i}
              footer={footer}
              onClickRemove={() => this._handleModifyFooter('remove', i)}
              onChange={(v) => this._handleModifyFooter('modify', i, v)}/>
          ))}
          <Footer onClickAdd={() => this._handleModifyFooter('add')} />
        </div>
      </div>
    );
  }

  @autobind
  _hanldleModifyHeader(value: TableRowType) {
    const { onChange, table } = this.props;
    onChange({ ...table, header: value });
  }

  @autobind
  _handleModifyRow(operation: string, index=0, value?: TableRowType) {
    const { onChange, table } = this.props;
    const { body } = table;
    if (operation === 'remove') {
      onChange({
        ...table,
        body: [ ...body.slice(0, index), ...body.slice(index + 1) ],
      });
    }
    else if (operation === 'add') {
      const newRow = { phase: '', service: '', comment: '', price: '' };
      onChange({ ...table, body: [ ...body, newRow ] });
    }
    else if (operation === 'modify') {
      onChange({
        ...table,
        body: Object.assign([], body, { [index]: value }),
      });
    }
  }

  @autobind
  _handleModifyFooter(operation: string, index=0, value?: FooterRowType) {
    const { onChange, table } = this.props;
    const { footers } = table;
    if (operation === 'remove') {
      onChange({
        ...table,
        footers: [ ...footers.slice(0, index), ...footers.slice(index + 1) ],
      });
    }
    else if (operation === 'add') {
      const newFooter = { label: '', comment: '', value: '' };
      onChange({ ...table, footers: [ ...footers, newFooter ] });
    }
    else if (operation === 'modify') {
      onChange({
        ...table,
        footers: Object.assign([], footers, { [index]: value }),
      });
    }
  }
}


export default Table;
