import React from 'react';
import { css } from 'emotion';
// import autobind from 'autobind-decorator';

import Title from '../components/Title';
import Button from '../components/Button';


const styles = {
  people: css`
    padding: calc(var(--padding) * 3);
  `,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: calc(var(--margin) * 2);
  `,
  actions: css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `,
};


class People extends React.Component {
  render() {
    // const people = [0, 0, 0, 0];
    return (
      <div className={styles.people}>
        <div className={styles.header}>
          <Title>
            People
          </Title>
          <div className={styles.actions}>
            <Button onClick={() => this.setState({ newSelectionOpen: true })}>
              New person
            </Button>
          </div>
        </div>
      </div>
    );
  }
}


export default People;
