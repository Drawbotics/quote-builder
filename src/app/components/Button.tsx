import React from 'react';
import { css, cx } from 'emotion';


const styles = {
  button: css`
    appearance: none;
    padding: calc(var(--padding) - 3px) calc(var(--padding) * 2);
    background: var(--primary);
    color: var(--white);
    border-radius: var(--border-radius);
    outline: 0;
    border: 0;
    box-shadow: var(--box-shadow);
    transition: all calc(var(--transition-duration) / 3) ease-in-out,
      background var(--transition-duration) ease-in-out,
      color var(--transition-duration) ease-in-out;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;

    &:hover {
      cursor: pointer;
      transform: translateY(-1px);
      box-shadow: 0px 7px 25px var(--primary-semi-transparent);
    }

    &:active {
      transform: translateY(0px);
      box-shadow: 0px 5px 15px var(--primary-semi-transparent);
    }

    &:disabled {
      opacity: 0.5;

      &:hover {
        cursor: not-allowed;
        box-shadow: var(--box-shadow);
        transform: initial;
      }

      > * {
        pointer-events: none;
      }
    }
  `,
  reverse: css`
    background: var(--tertiary);
    color: var(--text-primary);

    &:hover {
      box-shadow: var(--box-shadow-hover);
    }

    &:active {
      box-shadow: var(--box-shadow-active);
    }
  `,
  flat: css`
    background: transparent;
    color: var(--grey);
    box-shadow: none !important;
    transition: background var(--transition-duration-short) ease-in-out,
      color var(--transition-duration-short) ease-in-out;

    &:hover {
      background: var(--secondary);
      transform: none;
    }

    &:active {
      color: var(--text-primary);
    }
  `,
  fullWidth: css`
    width: 100%;
    flex: 1;
  `,
  icon: css`
    display: flex;
    margin-left: 10px;
  `,
  rowReverse: css`
    flex-direction: row-reverse;

    & [data-element="icon"] {
      margin-left: 0;
      margin-right: 10px;
    }
  `,
}


const Button: React.SFC<{
  children: string,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  icon?: React.ReactElement<{}>,
  reverse?: boolean,
  fullWidth?: boolean,
  disabled?: boolean,
  flat?: boolean,
  leftIcon?: boolean,
}> = ({ children, onClick, icon, reverse, fullWidth, disabled, flat, leftIcon }) => {
  return (
    <button className={cx(styles.button, {
      [styles.reverse]: reverse,
      [styles.fullWidth]: fullWidth,
      [styles.flat]: flat,
      [styles.rowReverse]: leftIcon,
    })} onClick={disabled ? undefined : onClick} disabled={disabled}>
      <span>{children}</span>
      {icon ? <div className={styles.icon} data-element="icon">{icon}</div> : null}
    </button>
  );
}


export default Button;
