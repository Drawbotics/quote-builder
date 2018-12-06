import React from 'react';
import { css } from 'emotion';


const styles = {
  divisor: css`
    width: 100%;
    display: flex;
    justify-content: flex-end;

    &::before {
      content: ' ';
      position: absolute;
      height: 2px;
      left: 0;
      width: 100vw;
      background: var(--line-color);
      transform: translateY(15px);
      transition: background var(--transition-duration) ease-in-out;
    }
  `,
  button: css`
    height: 30px;
    width: 30px;
    border-radius: 1000px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    background: var(--primary);
    font-size: 1.5rem;
    box-shadow: var(--box-shadow);
    transition: all var(--transition-duration-short) ease-in-out;
    transform: translateX(calc(var(--margin) * 3));

    &:hover {
      cursor: pointer;
      box-shadow: 0px 7px 25px var(--primary-semi-transparent);
    }

    &:active {
      box-shadow: 0px 5px 15px var(--primary-semi-transparent);
    }
  `,
};


const Divisor: React.SFC<{
  onClickPlus: () => void,
}> = ({ onClickPlus }) => {
  return (
    <div className={styles.divisor}>
      <div className={styles.button} onClick={onClickPlus}>+</div>
    </div>
  );
}


export default Divisor;
