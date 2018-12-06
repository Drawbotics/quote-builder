import React from 'react';
import { css } from 'emotion';

import RoundButton from '../RoundButton';


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
    transform: translateX(calc(var(--margin) * 3));
  `,
};


const Divisor: React.SFC<{
  onClickPlus: () => void,
}> = ({ onClickPlus }) => {
  return (
    <div className={styles.divisor}>
      <div className={styles.button}>
        <RoundButton onClick={onClickPlus} size={30}>+</RoundButton>
      </div>
    </div>
  );
}


export default Divisor;
