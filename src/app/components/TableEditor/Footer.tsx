import React from 'react';
import { css, cx } from 'emotion';
import autobind from 'autobind-decorator';

import { FooterRowType } from './types';
import ActionButton from './ActionButton';


const styles = {
  row: css`
    position: relative;
    display: flex;
    border-left: 1px solid var(--line-color);
    border-bottom: 1px solid var(--line-color);
    transition: all var(--transition-duration) ease-in-out,
      background var(--transition-duration-short) ease-in-out;
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
    transition: all var(--transition-duration) ease-in-out,
      box-shadow var(--transition-duration-short) ease-in-out;
    text-align: right;
    font-weight: 600;
    display: flex;
    align-items: center;
    outline: none;
    background: var(--tertiary);
    color: var(--text-primary);

    &:last-child {
      border-right: 0;
      width: 170px;
      flex: none;
      font-size: 1.4rem;
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

class Footer extends React.Component<{
  footer?: FooterRowType,
  onClickAdd?: () => void,
  onClickRemove?: () => void,
  onChange?: (v: FooterRowType) => void,
}> {
  render() {
    const { footer={} as FooterRowType, onClickAdd, onClickRemove } = this.props;
    return (
      <div className={cx(styles.row, { [styles.disabledRow]: !! onClickAdd })}>
        {onClickRemove ?
          <div className={styles.removeIcon} data-element="remove">
            <ActionButton label="—" onClick={onClickRemove} />
          </div>
        : null}
        {onClickAdd ?
          <div className={cx(styles.cell, styles.disabledCell)} style={{ textAlign: 'left' }}>
            <ActionButton label="＋" onClick={onClickAdd} />
          </div> :
          <input name="label" onChange={this._handleChangeValue} className={styles.cell} value={footer.label} />
        }
        <input name="comment" onChange={this._handleChangeValue} className={styles.cell} value={footer.comment} />
        <input name="value" onChange={this._handleChangeValue} className={styles.cell} value={footer.value} />
      </div>
    );
  }

  @autobind
  _handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    const { onChange, footer } = this.props;
    const newFooter = { ...footer, [e.target.name]: e.target.value } as FooterRowType;
    onChange ? onChange(newFooter) : null;
  }
}


export default Footer;
