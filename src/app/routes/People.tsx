import React from 'react';
import { css } from 'emotion';
import { Download } from 'react-feather';
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
  action: css`
    position: relative;
    margin-right: var(--margin);

    &:last-child {
      margin-right: 0;
    }
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
            <div className={styles.action}>
              <Button icon={<Download size={15} />} reverse>
                Import
              </Button>
            </div>
            <div className={styles.action}>
              <Button>
                New person
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default People;
