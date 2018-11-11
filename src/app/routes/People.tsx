import React from 'react';
import { css } from 'emotion';
import { Download } from 'react-feather';
import autobind from 'autobind-decorator';
import { v4 } from 'uuid';

import Title from '../components/Title';
import Button from '../components/Button';
import Person, { PersonType } from '../components/Person';
import { savePerson, loadPeople, deletePerson } from '../utils/people';


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
  state = {
    tempPerson: {} as PersonType,
    people: null,
    editing: {} as PersonType,
  }

  async componentWillMount() {
    const people = await loadPeople();
    this.setState({ people });
  }

  render() {
    const { people, tempPerson } = this.state;
    return (
      <div className={styles.people}>
        <div className={styles.header}>
          <Title>
            People
          </Title>
          <div className={styles.actions}>
            <div className={styles.action}>
              <Button icon={<Download size={15} />} reverse disabled={!! tempPerson.id}>
                Import
              </Button>
            </div>
            <div className={styles.action}>
              <Button onClick={() => this.setState({ tempPerson: { id: v4() }})} disabled={!! tempPerson.id}>
                New person
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.list}>
          {tempPerson.id ?
            <div key={tempPerson.id} className={styles.row}>
              <Person
                person={tempPerson}
                onClickDelete={() => this.setState({ tempPerson: {} })}
                onClickSave={this._handleCreateNew} />
            </div> : null}
          {people ?
            Object.values(people)
              .sort((a: any, b: any) => b.createdAt.localeCompare(a.createdAt))
              .map((person: PersonType) => (
              <div key={person.id} className={styles.row}>
                <Person
                  person={person}
                  onClickSave={this._handleSave}
                  onClickDelete={() => this._handleClickDelete(person.id)} />
              </div>
            ))
          : null}
        </div>
      </div>
    );
  }

  @autobind
  async _handleCreateNew(newPerson: PersonType | null) {
    if (! newPerson) return;
    await savePerson(newPerson.id, { ...newPerson, createdAt: new Date().toString() });
    const newPeople = await loadPeople();
    this.setState({ people: newPeople, tempPerson: {} });
  }

  @autobind
  async _handleClickDelete(id: any) {
    await deletePerson(id);
    const newPeople = await loadPeople();
    this.setState({ people: newPeople });
  }

  @autobind
  async _handleSave(updatedPerson: PersonType | null) {
    if (! updatedPerson) return;
    await savePerson(updatedPerson.id, updatedPerson);
    const newPeople = await loadPeople();
    this.setState({ people: newPeople });
  }
}


export default People;
