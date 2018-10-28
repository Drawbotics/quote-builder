import * as React from 'react';
import { css } from 'emotion';


const styles = {
  titleBar: css`
    height: 40px;
    background: red;
    -webkit-app-region: drag;
  `,
};


const TitleBar = () => {
  return (
    <div className={styles.titleBar}>

    </div>
  );
}


export default TitleBar;
