import * as React from 'react';
import { css } from 'emotion';


const styles = {
  titleBar: css`
    height: 40px;
    -webkit-app-region: drag;
    background: var(--secondary);
  `,
};


const TitleBar = () => {
  return (
    <div className={styles.titleBar}>

    </div>
  );
}


export default TitleBar;
