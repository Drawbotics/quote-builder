import React from 'react';
import { css } from 'emotion';
import { Download } from 'react-feather';

import Title from '../components/Title';
import Button from '../components/Button';
import Person from '../components/Person';


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
  list: css`
    margin-top: calc(var(--margin) * 2);
  `,
  row: css`
    margin-bottom: calc(var(--margin) * 4);
  `,
};


class People extends React.Component {
  render() {
    const people = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
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
        <div className={styles.list}>
          {people.map((person) => (
            <div key={person.id} className={styles.row}>
              <Person person={person} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}


export default People;
