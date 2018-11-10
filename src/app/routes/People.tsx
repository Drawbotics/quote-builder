import React from 'react';
import { css } from 'emotion';
import { Download } from 'react-feather';
import autobind from 'autobind-decorator';

import Title from '../components/Title';
import Button from '../components/Button';
import Person, { PersonType } from '../components/Person';


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
  }

  render() {
    const people: any = [];
    const { tempPerson } = this.state;
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
              <Button onClick={() => this.setState({ tempPerson: { id: -1 }})} disabled={!! tempPerson.id}>
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
          {people.map((person: PersonType) => (
            <div key={person.id} className={styles.row}>
              <Person person={person} onChangeField={() => null} />
            </div>
          ))}
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
  _handleCreateNew() {
    const { tempPerson } = this.state;
    console.log(tempPerson);
  }

  @autobind
  _handleSave() {

  }
}


export default People;
