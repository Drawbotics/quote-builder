import React from 'react';
import autobind from 'autobind-decorator';
import { css } from 'emotion';

import Button from '../Button';
import Table from './Table';


export interface TableType {
  header: object
  body: object[]
  footers: object[]
}


const styles = {
  tableEditor: css`
  `,
  tables: css`
  `,
  table: css`
  `,
  add: css`
  `,
}


class TableEditor extends React.Component {
  state = {
    tables: [],
  }

  render() {
    const { tables } = this.state;
    return (
      <div className={styles.tableEditor}>
        <div className={styles.tables}>
          {tables.map((table) => (
            <div className={styles.table}>
              <Table />
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
