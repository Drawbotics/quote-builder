import React from 'react';
import autobind from 'autobind-decorator';
import { css } from 'emotion';
import get from 'lodash/get';

import TableEditor, { TableType } from '../../TableEditor';
import Button from '../../Button';
import Input from '../../Input';

const styles = {
  section: css`
    margin-top: var(--margin);
    padding-top: var(--margin);
    border-top: 2px solid var(--line-color);
  `,
  tables: css`
    padding-right: calc(var(--margin) * 2);
    padding-left: var(--margin);
  `,
  editAddress: css`
    color: var(--primary);
    font-size: 0.8rem;
    text-decoration: underline;
    margin-top: calc(var(--margin) / 2);

    &:hover {
      cursor: pointer;
    }
  `,
};

class Tables extends React.Component<{
  document: any;
  onClickUpdate: (document: any) => void;
}> {
  state = {} as any;

  render() {
    const { openAddress, openValidUntil } = this.state;
    const {
      document: { data },
    } = this.props;
    const { tables, project, validUntil } = data;
    return (
      <div className={styles.tables}>
        <TableEditor tables={this.state.tables || tables} onChange={this._handleChange} />
        <div className={styles.section}>
          <div
            className={styles.editAddress}
            onClick={() => this.setState({ openValidUntil: true })}>
            Edit valid until date
          </div>
          <div
            style={openValidUntil ? { marginTop: 'calc(var(--margin) / 2)' } : { display: 'none' }}>
            <Input
              name="validUntil"
              label="Valid until date"
              value={get(this.state, 'validUntil', validUntil) || ''}
              onChange={this._handleChangeValidUntil}
            />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.editAddress} onClick={() => this.setState({ openAddress: true })}>
            Edit billing address
          </div>
          <div style={openAddress ? { marginTop: 'calc(var(--margin) / 2)' } : { display: 'none' }}>
            <Input
              area
              name="billingAddress"
              label="Billing address"
              value={get(this.state, 'billingAddress', project.billingAddress) || ''}
              onChange={this._handleChangeAddress}
            />
          </div>
        </div>
        <div className={styles.section}>
          <Button onClick={this._handleClickUpdate}>Update</Button>
        </div>
      </div>
    );
  }

  @autobind
  _handleChangeAddress(billingAddress: string) {
    this.setState({ billingAddress });
  }

  @autobind
  _handleChangeValidUntil(validUntil: string) {
    this.setState({ validUntil });
  }

  @autobind
  _handleChange(tables: TableType[]) {
    this.setState({ tables });
  }

  @autobind
  _handleClickUpdate() {
    const { tables, billingAddress, validUntil } = this.state;
    const { document, onClickUpdate } = this.props;
    if (tables) {
      document.data.tables = tables;
    }
    if (billingAddress) {
      document.data.project.billingAddress = billingAddress;
    }
    if (validUntil != null) {
      document.data.validUntil = validUntil;
    }
    onClickUpdate(document);
  }
}

export default Tables;
