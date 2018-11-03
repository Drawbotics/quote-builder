import * as React from 'react';
import { css } from 'emotion';


const styles = {
  title: css`
    color: var(--text-primary);
    font-size: 1.8em;
    transition: color var(--transition-duration) ease-in-out;
  `,
}


const Title: React.SFC<{
  children: string,
}> = ({ children }) => {
  return (
    <div className={styles.title}>
      {children}
    </div>
  );
}


export default Title;
