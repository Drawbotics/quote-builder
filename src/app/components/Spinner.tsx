import React from 'react';
import { css, keyframes } from 'emotion';

import porcIcon from '../images/porc.svg';


const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0, 0, 0);
  }

  40%, 43% {
    transform: translate3d(0, -7px, 0);
  }

  70% {
    transform: translate3d(0, -3px, 0);
  }

  90% {
    transform: translate3d(0, -1px, 0);
  }
`;



const styles = {
  spinner: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  icon: css`
    width: 100px;
    transform-origin: center bottom;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-name: ${bounce};
  `,
  label: css`
    color: var(--text-primary);
    margin-top: var(--margin);
    font-size: 1.5rem;
    font-weight: 600;
    transition: color var(--transition-duration) ease-in-out;
  `,
}


const Spinner: React.SFC<{
  label: string,
}> = ({ label }) => {
  return (
    <div className={styles.spinner}>
      <img className={styles.icon} src={porcIcon} />
      <div className={styles.label}>{label}</div>
    </div>
  );
}


export default Spinner;
