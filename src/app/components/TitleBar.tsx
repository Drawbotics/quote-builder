import React from 'react';
import { css } from 'emotion';


const styles = {
  titleBar: css`
    height: 100px;
    -webkit-app-region: drag;
    background: var(--tertiary);
    border-bottom: 1px solid var(--line-color);
    transition: all var(--transition-duration) ease-in-out;
  `,
};


const TitleBar = () => {
  return (
    <div className={styles.titleBar}>

    </div>
  );
}


export default TitleBar;
