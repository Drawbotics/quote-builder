import React from 'react';
import { css, cx } from 'emotion';


const styles = {
  title: css`
    color: var(--text-primary);
    font-size: 1.8em;
    transition: color var(--transition-duration) ease-in-out;
  `,
  small: css`
    font-size: 1.2em;
  `,
}


const Title: React.SFC<{
  children: string,
  small?: boolean,
}> = ({ children, small }) => {
  return (
    <div className={cx(styles.title, { [styles.small]: small })}>
      {children}
    </div>
  );
}


export default Title;
