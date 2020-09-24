import React from 'react';
import { css } from 'emotion';
import { Download } from 'react-feather';
import autobind from 'autobind-decorator';
import { v4 } from 'uuid';
import { remote } from 'electron';
import isEmpty from 'lodash/isEmpty';

import Title from '../components/Title';
import Button from '../components/Button';
import Person, { PersonType } from '../components/Person';
import { savePerson, loadPeople, deletePerson } from '../utils/storage/people';
import { showError, showMessage } from '../utils/dialogs';
import { readFile, writeFile } from '../utils';

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
  subtitle: css`
    color: var(--grey);
    margin-bottom: calc(var(--margin) * 2);
    transition: all var(--transition-duration) ease-in-out;
    text-align: center;
    font-size: 1.1rem;
  `,
};

class People extends React.Component {
  state: { tempPerson: PersonType; editing: PersonType; people: any } = {
    tempPerson: {} as PersonType,
    people: null,
    editing: {} as PersonType,
  };

  async componentWillMount() {
    const people = await loadPeople();
    // console.log(people);
    this.setState({ people });
  }

  render() {
    const { people, tempPerson } = this.state;
    return (
      <div className={styles.people}>
        <div className={styles.header}>
          <Title>People</Title>
          <div className={styles.actions}>
            <div className={styles.action}>
              <Button
                onClick={this._handleClickImport}
                icon={<Download size={15} />}
                reverse
                disabled={!!tempPerson.id}>
                Import
              </Button>
            </div>
            <div className={styles.action}>
              <Button
                onClick={() => this.setState({ tempPerson: { id: v4() } })}
                disabled={!!tempPerson.id}>
                New person
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.list}>
          {tempPerson.id ? (
            <div key={tempPerson.id} className={styles.row}>
              <Person
                person={tempPerson}
                onClickDelete={() => this.setState({ tempPerson: {} })}
                onClickSave={this._handleCreateNew}
              />
            </div>
          ) : null}
          {people
            ? Object.values(people)
                .sort((a: any, b: any) => b.createdAt.localeCompare(a.createdAt))
                .map((person: PersonType) => (
                  <div key={person.id} className={styles.row}>
                    <Person
                      person={person}
                      onClickExport={() => this._handleClickExport(person)}
                      onClickSave={this._handleClickSave}
                      onClickDelete={() => this._handleClickDelete(person.id)}
                    />
                  </div>
                ))
            : null}
          {!people && isEmpty(tempPerson) ? (
            <div className={styles.subtitle}>
              You have no profiles yet, create some to start making quotes.
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  @autobind
  async _handleCreateNew(newPerson: PersonType | null) {
    if (!newPerson) return;
    await savePerson(newPerson.id, { ...newPerson, createdAt: new Date().toString() });
    const newPeople = await loadPeople();
    this.setState({ people: newPeople, tempPerson: {} });
  }

  @autobind
  _handleClickDelete(id: any) {
    showMessage({
      type: 'warning',
      title: 'Are you sure you want to delete this person?',
      message:
        'It will not be removed from existing quotes, but you will not be able to assign it unless you re-import it or re-create it.',
      onClickAction: async () => {
        await deletePerson(id);
        const newPeople = await loadPeople();
        this.setState({ people: newPeople });
      },
      confirmButtonLabel: 'Delete',
      closeButtonLabel: 'Cancel',
    });
  }

  @autobind
  async _handleClickSave(updatedPerson: PersonType | null) {
    if (!updatedPerson) return;
    await savePerson(updatedPerson.id, updatedPerson);
    const newPeople = await loadPeople();
    this.setState({ people: newPeople });
  }

  @autobind
  _handleClickExport(person: PersonType) {
    const { name } = person;
    const { dialog } = remote;
    dialog.showSaveDialog(
      remote.getCurrentWindow(),
      {
        title: 'Export person',
        buttonLabel: 'Export',
        defaultPath: name,
        filters: [{ name: 'People', extensions: ['json'] }],
      },
      async (file) => {
        if (file) {
          await writeFile(file, JSON.stringify(person));
        }
      },
    );
  }

  @autobind
  async _handleClickImport() {
    const { dialog, getCurrentWindow } = remote;
    dialog.showOpenDialog(
      getCurrentWindow(),
      {
        properties: ['openFile'],
        title: 'Import person',
        buttonLabel: 'Import',
        filters: [{ name: 'People', extensions: ['json'] }],
      },
      async (files) => {
        if (files) {
          try {
            const rawPerson = await readFile(files[0]);
            const person = JSON.parse(rawPerson);
            await this._handleClickSave(person);
          } catch (error) {
            showError({ title: 'An error ocurred reading the file', extra: error.toString() });
          }
        }
      },
    );
  }
}

export default People;
