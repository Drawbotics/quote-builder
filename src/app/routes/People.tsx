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
                onChangeField={this._handleChangeField}
                person={tempPerson}
                onClickDelete={() => this.setState({ tempPerson: {} })}
                onClickSave={this._handleCreateNew} />
            </div> : null}
          {people ?
            Object.values(people).map((person: PersonType) => (
              <div key={person.id} className={styles.row}>
                <Person
                  person={person}
                  onChangeField={() => null}
                  onClickDelete={this._handleClickDelete}/>
              </div>
            ))
          : null}
        </div>
      </div>
    );
  }

  @autobind
  _handleChangeField(v: string | object, k: string) {
    this.setState({
      tempPerson: {
        ...this.state.tempPerson,
        [k]: v,
      },
    });
  }

  @autobind
  async _handleCreateNew() {
    const { tempPerson } = this.state;
    await savePerson(tempPerson.id, tempPerson);
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
  _handleSave() {

  }
}


export default People;
