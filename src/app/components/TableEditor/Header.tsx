import React from 'react';
import { css, cx } from 'emotion';
import autobind from 'autobind-decorator';
import { EyeOff } from 'react-feather';

import { TableHeaderType } from './types';
import { getCurrentLocale } from '../../utils';
import { translateAlt as ta  } from '../../utils/translation';


const styles = {
  header: css`
    display: flex;
    border-left: 1px solid var(--line-color);
    border-bottom: 1px solid var(--line-color);
    transition: all var(--transition-duration) ease-in-out;
  `,
  cell: css`
    flex: 1;
    border: none;
    border-right: 1px solid var(--line-color);
    padding: calc(var(--padding) / 2) var(--padding);
    transition: all var(--transition-duration) ease-in-out,
      box-shadow var(--transition-duration-short) ease-in-out;
    outline: none;
    color: var(--grey);
    background: var(--tertiary);
    font-size: 0.85rem;
    font-weight: 600;

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
  small: css`
    flex: none;
    padding: 0;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
}


class Header extends React.Component <{
  header: TableHeaderType,
  onChange: (v: TableHeaderType) => void,
}> {
  render() {
    const { header } = this.props;
    const loc = getCurrentLocale();
    return (
      <div className={styles.header}>
        <input name="phase" className={styles.cell} value={ta(loc, 'table.phase', header.phase)} onChange={this._handleChangeValue} />
        <input name="service" className={styles.cell} value={ta(loc, 'table.service', header.service)} onChange={this._handleChangeValue} />
        <input name="comment" className={styles.cell} value={ta(loc, 'table.comment', header.comment)} onChange={this._handleChangeValue} />
        <input name="price" className={styles.cell} value={ta(loc, 'table.price', header.price)} onChange={this._handleChangeValue} />
        <div className={cx(styles.cell, styles.small)} data-tooltip-side="left" data-tooltip="Hide from table"><EyeOff size={15} /></div>
      </div>
    );
  }

  @autobind
  _handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    const { onChange, header } = this.props;
    const newHeader = { ...header, [e.target.name]: e.target.value } as TableHeaderType;
    onChange(newHeader);
  }
}


export default Header;
