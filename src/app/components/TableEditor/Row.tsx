import React from 'react';
import { css, cx } from 'emotion';
import autobind from 'autobind-decorator';

import { TableRowType } from './types';
import ActionButton from './ActionButton';
import Select, { SelectOptionType } from '../Select';
import { services } from '../../utils/services';
import { translate as t } from '../../utils/translation';


const styles = {
  row: css`
    height: 60px;
    position: relative;
    display: flex;
    border-left: 1px solid var(--line-color);
    border-bottom: 1px solid var(--line-color);
    transition: all var(--transition-duration) ease-in-out;
    font-size: 0.9rem;
    color: var(--text-primary);
  `,
  disabledRow: css`
    & > div, > input {
      pointer-events: none;
    }
  `,
  cell: css`
    flex: 1;
    border: none;
    border-right: 1px solid var(--line-color);
    padding: var(--padding);
    background: var(--tertiary);
    color: var(--text-primary);
    transition: all var(--transition-duration) ease-in-out,
      box-shadow var(--transition-duration-short) ease-in-out;
    outline: none;

    &:last-child {
      border-right: 0;
      text-align: right;
    }

    &:hover {
      cursor: pointer;
      background: var(--primary-transparent);
      transition: background var(--transition-duration-short) ease-in-out
    }

    &:focus {
      box-shadow: inset 0px 0px 0px 2px var(--primary);
    }
  `,
  disabledCell: css`
    cursor: default !important;
    background: none !important;
  `,
  removeIcon: css`
    position: absolute;
    right: calc(var(--margin) * -2);
    top: calc(50% - 15px);
    z-index: 9;
  `,
}


class Row extends React.Component <{
  row?: TableRowType,
  onClickAdd?: () => void,
  onClickRemove?: () => void,
  onChange?: (v: TableRowType) => void,
}> {
  render() {
    const { row={} as TableRowType, onClickAdd, onClickRemove } = this.props;
    const displayServices = services.map((service: string) => ({ value: service, label: t('en', `services.${service}.name`) } as SelectOptionType));
    const showInput = row.service && (! services.includes(row.service) || row.service === 'custom');
    return (
      <div className={cx(styles.row, { [styles.disabledRow]: !! onClickAdd })}>
        {onClickRemove ?
          <div className={styles.removeIcon} data-element="remove">
            <ActionButton label="—" onClick={() => onClickRemove()} />
          </div>
        : null}
        {onClickAdd ?
          <div className={cx(styles.cell, styles.disabledCell)}>
            <ActionButton label="＋" onClick={onClickAdd} />
          </div> :
          <input name="phase" onChange={this._handleChangeValue} className={styles.cell} value={row.phase} />
        }
        {onClickAdd ?
          <div className={cx(styles.cell, styles.disabledCell)} /> :
          (showInput ?
            <input name="service" onChange={this._handleChangeValue} className={styles.cell} value={row.service} /> :
            <Select
              name="service"
              className={styles.cell}
              values={displayServices}
              onChange={(v: string, n: string) => this._handleChangeValue({ target: { name: n, value: v } } as React.ChangeEvent<HTMLInputElement>)}
              value={row.service}
              placeholder="Select service" />
            )
        }
        <input name="comment" onChange={this._handleChangeValue} className={styles.cell} value={row.comment} />
        <input name="price" onChange={this._handleChangeValue} className={styles.cell} value={row.price} />
      </div>
    );
  }

  @autobind
  _handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    const { onChange, row } = this.props;
    const newRow = { ...row, [e.target.name]: e.target.value } as TableRowType;
    onChange ? onChange(newRow) : null;
  }
}


export default Row;
