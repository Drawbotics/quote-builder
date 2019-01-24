import React from 'react';
import { css, cx } from 'emotion';
import autobind from 'autobind-decorator';

import Button from '../../Button';
import { PersonType } from '../../Person';
import ProfilePicture from '../../ProfilePicture';
import { loadPeople } from '~/utils/storage/people';


const styles = {
  profile: css`
    max-width: 450px;
  `,
  people: css`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: var(--margin);
  `,
  person: css`
    margin: calc(var(--margin) / 2);
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
};


class Profile extends React.Component<{
  document: any,
  onClickUpdate: (document: any) => void,
}> {
  state = {
    people: [] as PersonType[],
    selectedPerson: 0,
  }

  async componentWillMount() {
    const { document: { data } } = this.props;
    const people = await loadPeople();
    this.setState({ people, selectedPerson: data.person.id });
  }

  render() {
    const { selectedPerson, people } = this.state;
    return (
      <div className={styles.profile}>
        <div className={styles.people}>
          {Object.values(people).map((person) => (
            <div className={styles.person} key={person.id} onClick={() => this.setState({ selectedPerson: person.id })}>
              <ProfilePicture photo={person.profilePicture} selected={selectedPerson === person.id} />
              <div className={cx(styles.name, { [styles.selected]: selectedPerson === person.id })}>
                {person.name.split(' ')[0]}
              </div>
            </div>
          ))}
        </div>
        <Button onClick={this._handleClickUpdate}>Update</Button>
      </div>
    );
  }

  @autobind
  _handleClickUpdate() {
    const { people, selectedPerson } = this.state;
    const { document, onClickUpdate } = this.props;
    document.data.person = people[selectedPerson];
    onClickUpdate(document);
  }
}


export default Profile;
