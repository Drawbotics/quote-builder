import React from 'react';
import { css, keyframes, cx } from 'emotion';


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
    stroke-width: 4;
    stroke: var(--white);
    stroke-miterlimit: 10;
    box-shadow: inset 0px 0px 0px var(--primary);
    transform: scale(0);
    transition: transform var(--transition-duration) ease-in-out;
  `,
  checked: css`
    transform: none;
    animation: ${fill} calc(var(--transition-duration) * 2) calc(var(--transition-duration) - 0.1s) ease-in-out forwards,
      ${scale} var(--transition-duration) var(--transition-duration) ease-in-out both;

    & > [data-element="circle"] {
      animation: ${stroke} var(--transition-duration) ${curve} forwards;
    }

    & > [data-element="check"] {
      animation: ${stroke} var(--transition-duration) ${curve} var(--transition-duration) forwards;
    }
  `,
  circle: css`
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: var(--primary);
    fill: none;
  `,
  check: css`
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
  `,
}


const AnimatedCheckmark: React.SFC<{
  size?: number,
  checked: boolean,
}> = ({
  size,
  checked,
}) => {
  return (
    <svg className={cx(styles.checkmark, { [styles.checked]: checked })} viewBox="0 0 52 52" style={{ height: size, width: size }}>
      <circle className={styles.circle} cx="26" cy="26" r="25" fill="none" data-element="circle" />
      <path className={styles.check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" data-element="check" />
    </svg>
  );
}


export default AnimatedCheckmark;
