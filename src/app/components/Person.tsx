import React from 'react';
import { css } from 'emotion';
import { Share } from 'react-feather';
import { get } from 'lodash';

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


// const pic = 'http://s3.amazonaws.com/cdn.roosterteeth.com/uploads/images/36437c1c-f403-42c3-a3a0-4886a49bd012/original/2195219-1449924847806-image-2.jpg';
// const signature = 'https://upload.wikimedia.org/wikipedia/commons/0/00/Todd_Strasser_signature.png';


export interface PersonType {
  id: number
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
}


class Person extends React.Component<{
  person: PersonType
}> {
  state = {
    language: 'en',
  }

  render() {
    const { person } = this.props;
    const { language } = this.state;
    const description: string = get(person, `descriptions[${language}]`);
    return (
      <div className={styles.person}>
        <div className={styles.profile}>
          <ProfilePicture photo={person.profilePicture} onClick={() => console.log('hi')} />
          <div className={styles.langSwitcher}>
            <Tabs
              value='fr'
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
            <Input name="name" onChange={(v, n) => console.log(v, n)} placeholder="Name Surname" value={person.name} />
            <Input name="role" onChange={(v, n) => console.log(v, n)} placeholder="Role e.g. Sales Manager France" value={person.role} />
            <Input name="mobile" onChange={(v, n) => console.log(v, n)} placeholder="Mobile" label="M" value={person.mobile} />
            <Input name="phone" onChange={(v, n) => console.log(v, n)} placeholder="Phone" label="T" value={person.phone} />
            <Input name="email" onChange={(v, n) => console.log(v, n)} placeholder="Email" label="E" value={person.email} />
          </InputGroup>
          <div className={styles.label}>
            Signature:
          </div>
          <div className={styles.signature}>
            <div className={styles.preview}>
              <img src={person.signature} />
            </div>
            <div className={styles.fileSelector}>
              <FileSelector label="Pick signature" onFileSelect={(v) => console.log(v)} />
            </div>
          </div>
          <div className={styles.actions}>
            <div className={styles.action}>
              <Button fullWidth>Save</Button>
            </div>
            <div className={styles.action}>
              <Button reverse fullWidth icon={<Share size={15} />}>Export</Button>
            </div>
            <div className={styles.action}>
              <Button reverse fullWidth>Delete</Button>
            </div>
          </div>
        </div>
        <div className={styles.description}>
          <Input name="description" area={true} onChange={(v, n) => console.log(v, n)} placeholder="Description" value={description} />
        </div>
      </div>
    );
  }
}


export default Person;
