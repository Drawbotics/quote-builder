import React from 'react';
import { css, cx } from 'emotion';


const styles = {
  button: css`
    height: 50px;
    width: 50px;
    border-radius: 1000px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    background: var(--primary);
    font-size: 1.7rem;
    box-shadow: var(--box-shadow);
    transition: all var(--transition-duration-short) ease-in-out;

    &:hover {
      cursor: pointer;
      box-shadow: 0px 7px 25px var(--primary-semi-transparent);
    }

    &:active {
      box-shadow: 0px 5px 15px var(--primary-semi-transparent);
      transform: scale(0.95);
    }
  `,
  disabled: css`
    cursor: not-allowed;
    opacity: 0.5;
  `,
};


const RoundButton: React.SFC<{
  onClick: () => void,
  children: string,
  size?: number,
  disabled?: boolean,
}> = ({ onClick, children, size, disabled }) => {
  return (
    <div className={cx(styles.button, { [styles.disabled]: disabled })} onClick={disabled ? x=>x : onClick} style={size ? { height: size, width: size } : undefined}>{children}</div>
  );
}


export default RoundButton;
