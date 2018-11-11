import React from 'react';
import { css } from 'emotion';
import { Share } from 'react-feather';
import { get } from 'lodash';
import autobind from 'autobind-decorator';
import fs from 'fs';
import { last } from 'lodash';
import { remote } from 'electron';

import Tabs from './Tabs';
import ProfilePicture from './ProfilePicture';
import Input, { InputGroup } from './Input';
import FileSelector from './FileSelector';
import Button from './Button';


const styles = {
  person: css`
    display: flex;
    align-items: flex-start;
  `,
  profile: css`
    margin-right: calc(var(--margin) * 2);
  `,

  langSwitcher: css`
    margin-top: var(--margin);
    display: flex;
    justify-content: center;
  `,
  info: css`
    width: 400px;
    margin-right: var(--margin);
  `,
  description: css`
    flex: 1;
  `,
  label: css`
    margin: var(--margin) 0;
    color: var(--text-primary);
    transition: all var(--transition-duration) ease-in-out;
    font-size: 0.9rem;
  `,
  signature: css`
    display: flex;
    align-items: stretch;
    height: 100px;
  `,
  preview: css`
    flex: 1;
    background: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: var(--margin);

    > img {
      height: calc(100% - var(--padding));
      width: calc(100% - var(--padding));
      object-fit: contain;
    }
  `,
  fileSelector: css`
    flex: 1;
    display: flex;
    align-items: stretch;
  `,
  actions: css`
    display: flex;
    align-items: center;
    margin-top: var(--margin);
  `,
  action: css`
    flex: 1;
    margin-right: var(--margin);

    &:last-child {
      margin-right: 0;
    }
  `,
};


export interface PersonType {
  id: any
  name: string
  profilePicture: string
  role: string
  descriptions: {
    en: string
    fr: string
    nl: string
  }
  email: string
  mobile: string
  phone: string
  signature: string
  createdAt: Date
  [key: string]: any;
}


function getValueForField(key: string, curr: PersonType, prev: PersonType) {
  if (curr[key] || curr[key] === '') {
    return curr[key];
  }
  else if (prev[key]) {
    return prev[key];
  }
  else {
    return '';
  }
}


class Person extends React.Component<{
  person: PersonType
  onClickDelete?: (id: any) => void,
  onClickSave?: (person: PersonType) => void,
  onClickExport?: () => void,
}> {
  state = {
    language: 'en',
    editing: {} as PersonType,
  }

  _isMounted = true;

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { person, onClickDelete, onClickExport, onClickSave } = this.props;
    const { language, editing } = this.state;
    const description: string = get(editing.descriptions ? editing : person, `descriptions[${language}]`);
    const canSave = Object.keys(editing).length > 0;
    return (
      <div className={styles.person}>
        <div className={styles.profile}>
          <ProfilePicture photo={editing.profilePicture || person.profilePicture} onClick={() => this._handleSelectFile('profilePicture')} />
          <div className={styles.langSwitcher}>
            <Tabs
              value={language}
              tabs={[{
                label: 'En',
                value: 'en',
              }, {
                label: 'Fr',
                value: 'fr',
              }, {
                label: 'Nl',
                value: 'nl',
              }]}
              onChange={(v) => this.setState({ language: v })} />
          </div>
        </div>
        <div className={styles.info}>
          <InputGroup>
            <Input name="name" onChange={this._handleChangeField} placeholder="Name Surname" value={getValueForField('name', editing, person)} />
            <Input name="role" onChange={this._handleChangeField} placeholder="Role e.g. Sales Manager France" value={getValueForField('role', editing, person)} />
            <Input name="mobile" onChange={this._handleChangeField} placeholder="Mobile" label="M" value={getValueForField('mobile', editing, person)} />
            <Input name="phone" onChange={this._handleChangeField} placeholder="Phone" label="T" value={getValueForField('phone', editing, person)} />
            <Input name="email" onChange={this._handleChangeField} placeholder="Email" label="E" value={getValueForField('email', editing, person)} />
          </InputGroup>
          <div className={styles.label}>
            Signature:
          </div>
          <div className={styles.signature}>
            <div className={styles.preview}>
              <img src={editing.signature || person.signature} />
            </div>
            <div className={styles.fileSelector}>
              <FileSelector label="Pick signature" onFileSelect={() => this._handleSelectFile('signature', ['png'])} />
            </div>
          </div>
          <div className={styles.actions}>
            {onClickSave ?
              <div className={styles.action}>
                <Button fullWidth onClick={this._handleClickSave} disabled={! canSave}>Save</Button>
              </div>
            : null}
            {onClickDelete ?
              <div className={styles.action}>
                <Button reverse fullWidth onClick={onClickDelete}>Delete</Button>
              </div>
            : null}
            {onClickExport ?
              <div className={styles.action}>
                <Button reverse fullWidth icon={<Share size={15} />} onClick={onClickExport}>Export</Button>
              </div>
            : null}
          </div>
        </div>
        <div className={styles.description}>
          <Input name="descriptions" area={true} onChange={this._handleChangeDescription} placeholder="Description" value={description || ''} />
        </div>
      </div>
    );
  }

  @autobind
  _handleSelectFile(key: string, types=['jpg', 'png']) {
    const { dialog } = remote;
    const filepaths = dialog.showOpenDialog(remote.getCurrentWindow(), {
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: types }],
    });
    if (filepaths) {
      const file = filepaths[0];
      const fileExt = last(file.split('.'));
      const data = fs.readFileSync(filepaths[0], 'base64');
      if (! data) {
        alert(`An error ocurred reading the file`);
      }
      else {
        const dataURL = `data:image/${fileExt};base64,${data}`;
        this._handleChangeField(dataURL, key);
      }
    }
  }

  @autobind
  _handleChangeDescription(v: string, k: string) {
    const { person } = this.props;
    const { language, editing } = this.state;
    this._handleChangeField({
      ...person.descriptions,
      ...editing.descriptions,
      [language]: v,
    }, k);
  }

  @autobind
  _handleChangeField(v: string | object, k: string) {
    this.setState({
      editing: {
        ...this.state.editing,
        [k]: v,
      },
    });
  }

  @autobind
  async _handleClickSave() {
    const { onClickSave, person } = this.props;
    const { editing } = this.state;
    if (onClickSave) {
      await onClickSave({ ...person, ...editing });
      if (this._isMounted) {
        this.setState({ editing: {} });
      }
    }
  }
}


export default Person;
