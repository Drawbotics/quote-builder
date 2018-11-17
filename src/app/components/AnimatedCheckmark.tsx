import React from 'react';
import { css, keyframes } from 'emotion';


const curve = 'cubic-bezier(0.65, 0, 0.45, 1)';

const fill = keyframes`
  100% {
    box-shadow: inset 0px 0px 0px 100px var(--primary);
  }
`;

const scale = keyframes`
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
`;

const stroke = keyframes`
  100% {
    stroke-dashoffset: 0;
  }
`;

const styles = {
  checkmark: css`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: var(--white);
    stroke-miterlimit: 10;
    box-shadow: inset 0px 0px 0px var(--primary);
    animation: ${fill} calc(var(--transition-duration) * 2) calc(var(--transition-duration) * 2 - 0.2s) ease-in-out forwards,
      ${scale} var(--transition-duration) calc(var(--transition-duration) * 2) ease-in-out both;
  `,
  circle: css`
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: var(--primary);
    fill: none;
    animation: ${stroke} calc(var(--transition-duration) * 2) ${curve} forwards;
  `,
  check: css`
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: ${stroke} var(--transition-duration) ${curve} calc(var(--transition-duration) * 2) forwards;
  `,
}


const AnimatedCheckmark: React.SFC<{
  size?: number
}> = ({
  size,
}) => {
  return (
    <svg className={styles.checkmark} viewBox="0 0 52 52" style={{ height: size, width: size }}>
      <circle className={styles.circle} cx="26" cy="26" r="25" fill="none"/>
      <path className={styles.check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
    </svg>
  );
}


export default AnimatedCheckmark;
