import React from 'react';
import { css } from 'emotion';

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

    &:hover {
      [data-element="remove"] {
        opacity: 1;
        transform: scale(1);
      }
    }

    &::after {
      position: absolute;
      content: ' ';
      right: -40px;
      top: 0;
      height: 100%;
      width: 40px;
    }
  `,
  cell: css`
    flex: 1;
    border-right: 1px solid var(--line-color);
    padding: var(--padding);
    transition: border-color var(--transition-duration) ease-in-out;
    text-align: right;
    font-weight: 600;
    display: flex;
    align-items: center;

    &:last-child {
      border-right: 0;
      width: 170px;
      flex: none;
      font-size: 1.4rem;
    }
  `,
  removeIcon: css`
    position: absolute;
    right: calc(var(--margin) * -2);
    top: calc(50% - 15px);
    transform: scale(0);
    opacity: 0;
    z-index: 9;
    transition: all var(--transition-duration-short) ease-in-out;
  `,
}

class Footer extends React.Component<{
  footer: FooterRowType,
}> {
  render() {
    const { footer } = this.props;
    return (
      <div className={styles.row}>
        <div className={styles.removeIcon} data-element="remove">
          <ActionButton label="—" onClick={() => undefined} />
        </div>
        <div className={styles.cell} style={{ textAlign: 'left' }}>
          {footer.label}
        </div>
        <div className={styles.cell}>
          {footer.comment}
        </div>
        <div className={styles.cell}>
          {footer.value}
        </div>
      </div>
    );
  }
}


export default Footer;
