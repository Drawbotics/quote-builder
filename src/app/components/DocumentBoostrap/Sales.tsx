import React from 'react';
import { css, cx } from 'emotion';
import get from 'lodash/get';

import { loadPeople } from '../../utils/storage/people';
import ProfilePicture from '../ProfilePicture';
import { PersonType } from '../Person';


interface SalesValues {
  personId: string
}


const styles = {
  sales: css`
    display: flex;
    flex-wrap: wrap;
    max-width: 1000px;
    margin-bottom: calc(var(--margin) * 2);
  `,
  person: css`
    margin: var(--margin);
    transition: transform var(--transition-duration-short) ease-in-out;

    &:hover {
      cursor: pointer;
      transform: translateY(-3px);
    }
  `,
  name: css`
    margin-top: var(--margin);
    color: var(--grey);
    text-align: center;
    transition: all var(--transition-duration) ease-in-out;
  `,
  selected: css`
    color: var(--text-primary);
  `,
}


class Sales extends React.Component<{
  onChange: (v: string, k: string) => void,
  value: SalesValues,
}> {
  state = {
    people: [] as PersonType[],
  }

  async componentWillMount() {
    const people = await loadPeople();
    this.setState({ people });
  }

  render() {
    const { people } = this.state;
    const { onChange, value } = this.props;
    const personId = get(value, 'personId', '');
    return (
      <div className={styles.sales}>
        {Object.values(people).map((person) => (
          <div className={styles.person} key={person.id} onClick={() => onChange(person.id, 'personId')}>
            <ProfilePicture photo={person.profilePicture} selected={personId === person.id} />
            <div className={cx(styles.name, { [styles.selected]: personId === person.id })}>
              {person.name.split(' ')[0]}
            </div>
          </div>
        ))}
      </div>
    );
  }
}


export default Sales;
