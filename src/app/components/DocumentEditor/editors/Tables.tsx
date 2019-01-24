import React from 'react';
import autobind from 'autobind-decorator';
import { css } from 'emotion';

import TableEditor, { TableType } from '../../TableEditor';
import Button from '../../Button';


const styles = {
  update: css`
    margin-top: var(--margin);
    padding-top: var(--margin);
    border-top: 2px solid var(--line-color);
  `,
  tables: css`
    padding-right: calc(var(--margin) * 2);
  `,
};


class Tables extends React.Component<{
  document: any,
  onClickUpdate: (document: any) => void,
}> {
  state = {} as any

  render() {
    const { document: { data } } = this.props;
    const { tables } = data;
    return (
      <div className={styles.tables}>
        <TableEditor tables={this.state.tables || tables} onChange={this._handleChange} />
        <div className={styles.update}>
          <Button onClick={this._handleClickUpdate}>Update</Button>
        </div>
      </div>
    );
  }

  @autobind
  _handleChange(tables: TableType[]) {
    this.setState({ tables });
  }

  @autobind
  _handleClickUpdate() {
    const { tables } = this.state;
    const { document, onClickUpdate } = this.props;
    if (tables) {
      document.data.tables = tables;
      onClickUpdate(document);
    }
  }
}


export default Tables;
