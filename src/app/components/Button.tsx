import React from 'react';
import { css } from 'emotion';


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
    transition: all calc(var(--transition-duration) / 3) ease-in-out;

    &:hover {
      cursor: pointer;
      transform: translateY(-1px);
      box-shadow: 0px 7px 25px var(--primary-semi-transparent);
    }

    &:active {
      transform: translateY(0px);
      box-shadow: 0px 5px 15px var(--primary-semi-transparent);
    }
  `,
}


const Button: React.SFC<{
  children: string,
  onClick?: (e: any) => void,
}> = ({ children, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}


export default Button;
