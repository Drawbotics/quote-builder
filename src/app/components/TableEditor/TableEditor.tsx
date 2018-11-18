import React from 'react';
import autobind from 'autobind-decorator';
import { css } from 'emotion';

import Button from '../Button';
import Table from './Table';
import { TableType } from './types';


const initialTable: TableType = {
  header: {
    phase: 'Phase',
    service: 'Service',
    comment: 'Comment',
    price: 'Price',
  },
  body: [
    {
      phase: 'Teasing',
      service: '3D Exterior',
      comment: 'Blablabla',
      price: '€3000'
    },
    {
      phase: '',
      service: '3D Exterior',
      comment: 'Blablabla',
      price: '€3000'
    },
    {
      phase: 'Teasing',
      service: '3D Exterior',
      comment: 'Blablabla',
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
  `,
  add: css`
    margin-bottom: var(--margin);
  `,
}


class TableEditor extends React.Component {
  state = {
    tables: [initialTable],
  }

  render() {
    const { tables } = this.state;
    return (
      <div className={styles.tableEditor}>
        <div className={styles.tables}>
          {tables.map((table, i) => (
            <div className={styles.table} key={i}>
              <Table table={table} />
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <Button>Add table</Button>
        </div>
      </div>
    );
  }

  @autobind
  _handleModifyTable(newTable: TableType, index: number) {
    const { tables } = this.state;
    this.setState({
      tables: Object.assign([], tables, { [index]: newTable }),
    });
  }
}


export default TableEditor;
