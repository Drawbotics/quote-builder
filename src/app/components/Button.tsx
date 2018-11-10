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
      opacity: 0.7;

      &:hover {
        cursor: not-allowed;
        box-shadow: var(--box-shadow);
        transform: initial;
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
  fullWidth: css`
    width: 100%;
    flex: 1;
  `,
  icon: css`
    margin-left: 10px;
  `,
}


const Button: React.SFC<{
  children: string,
  onClick?: (e: any) => void,
  icon?: React.ReactElement<{}>,
  reverse?: boolean,
  fullWidth?: boolean,
  disabled?: boolean,
}> = ({ children, onClick, icon, reverse, fullWidth, disabled }) => {
  return (
    <button className={cx(styles.button, {
      [styles.reverse]: reverse,
      [styles.fullWidth]: fullWidth,
    })} onClick={onClick} disabled={disabled}>
      {children}
      {icon ? <div className={styles.icon}>{icon}</div> : null}
    </button>
  );
}


export default Button;