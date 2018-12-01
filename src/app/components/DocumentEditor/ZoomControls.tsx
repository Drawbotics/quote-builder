import React from 'react';
import { css } from 'emotion';
import { round } from 'lodash';


const styles = {
  controls: css`
    display: inline-flex;
    align-items: center;
  `,
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
  value: css`
    color: var(--text-primary);
    width: 60px;
    text-align: center;
    transition: all var(--transition-duration) ease-in-out;
  `,
};


const ZoomControls: React.SFC<{
  onClickZoom: (v: number) => void,
  zoom: number,
}> = ({ onClickZoom, zoom }) => {
  return (
    <div className={styles.controls}>
      <div className={styles.button} onClick={() => onClickZoom(zoom - 0.1)}>-</div>
      <div className={styles.value}>{`${round(zoom * 100, 3)}%`}</div>
      <div className={styles.button}onClick={() => onClickZoom(zoom + 0.1)}>+</div>
    </div>
  );
}


export default ZoomControls;
