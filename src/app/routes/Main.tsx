import * as React from 'react';
import { css } from 'emotion';


const styles = {
  main: css`
    height: 40px;
    background: var(--primary);
  `,
};

class Main extends React.Component {
  render() {
    return (
      <div className={styles.main}>
        orange stuff
      </div>
    );
  }
}


export default Main;
