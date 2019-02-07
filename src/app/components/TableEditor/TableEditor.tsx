import React from 'react';
import autobind from 'autobind-decorator';
import { css, cx } from 'emotion';

import Button from '../Button';
import Table from './Table';
import { TableType } from './types';


const initialTable: TableType = {
  header: {
    phase: undefined,
    service: undefined,
    comment: undefined,
    price: undefined,
  },
  body: [
    {
      phase: 'Teasing',
      service: { id: 'exterior3d' },
      comment: 'Exterior comment',
      price: '€3000'
    },
    {
      phase: '',
      service: { id: undefined },
      comment: '',
      price: '€3000'
    },
    {
      phase: 'Commercialisation',
      service: { id: 'interior3d' },
      comment: 'Interior comment',
      price: '€3000'
    }
  ],
  footers: [
    {
      label: 'Total',
      comment: '',
      value: '€1.500.000',
    },
  ],
}


const styles = {
  tableEditor: css`
    width: 100%;
  `,
  tables: css`
    margin-bottom: var(--margin);
  `,
  table: css`
    margin-bottom: calc(var(--margin) * 2);
  `,
  add: css`
    margin-bottom: var(--margin);
  `,
  center: css`
    display: flex;
    justify-content: center;
  `,
}


class TableEditor extends React.Component<{
  tables: TableType[],
  onChange: (v: TableType[]) => void,
}> {
  render() {
    const { tables } = this.props;
    return (
      <div className={styles.tableEditor}>
        <div className={styles.tables}>
          {tables.map((table, i) => (
            <div className={styles.table} key={i}>
              <Table table={table} onChange={(t) => this._handleModifyTable(t, i)} />
            </div>
          ))}
        </div>
        <div className={cx(styles.add, { [styles.center]: tables.length === 0 })}>
          <Button onClick={this._handleAddTable}>Add table</Button>
        </div>
      </div>
    );
  }

  @autobind
  _handleModifyTable(newTable: TableType, index: number) {
    const { tables, onChange } = this.props;
    if (newTable.body.length === 0 && newTable.footers.length === 0) {
      onChange([ ...tables.slice(0, index), ...tables.slice(index + 1) ]);
    }
    else {
      onChange(Object.assign([], tables, { [index]: newTable }));
    }
  }

  @autobind
  _handleAddTable() {
    const { tables, onChange } = this.props;
    onChange([ ...tables, initialTable ]);
  }
}


export default TableEditor;
