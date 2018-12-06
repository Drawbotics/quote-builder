import React from 'react';
import { css } from 'emotion';
import { round } from 'lodash';

import RoundButton from '../RoundButton';


const styles = {
  controls: css`
    display: inline-flex;
    align-items: center;
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
      <RoundButton onClick={() => onClickZoom(zoom - 0.1)}>-</RoundButton>
      <div className={styles.value}>{`${round(zoom * 100, 3)}%`}</div>
      <RoundButton onClick={() => onClickZoom(zoom + 0.1)}>+</RoundButton>
    </div>
  );
}


export default ZoomControls;
