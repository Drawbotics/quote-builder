import React from 'react';
import { css } from 'emotion';
// import autobind from 'autobind-decorator';

import Title from '../components/Title';


const styles = {
  exports: css`
    padding: calc(var(--padding) * 3);
  `,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: calc(var(--margin) * 2);
  `,
};


class Exports extends React.Component {
  render() {
    // const exports = [0, 0, 0, 0];
    return (
      <div className={styles.exports}>
        <div className={styles.header}>
          <Title>
            Exports
          </Title>
        </div>
      </div>
    );
  }
}


export default Exports;
