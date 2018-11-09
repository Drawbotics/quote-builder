import React from 'react';
import { css } from 'emotion';

import Tabs from './Tabs';
import ProfilePicture from './ProfilePicture';
import Input, { InputGroup } from './Input';
import FileSelector from './FileSelector';


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
    flex: 0.4;
    margin-right: var(--margin);
  `,
  description: css`
    flex: 0.6;
  `,
  label: css`
    margin: var(--margin) 0;
    color: var(--text-primary);
    transition: all var(--transition-duration) ease-in-out;
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
  `,
};


const pic = 'http://s3.amazonaws.com/cdn.roosterteeth.com/uploads/images/36437c1c-f403-42c3-a3a0-4886a49bd012/original/2195219-1449924847806-image-2.jpg';
const signature = 'https://upload.wikimedia.org/wikipedia/commons/0/00/Todd_Strasser_signature.png';


const Person: React.SFC<{
  person: object,
}> = ({ person }) => {
  return (
    <div className={styles.person}>
      <div className={styles.profile}>
        <ProfilePicture photo={pic} onClick={() => console.log('hi')} />
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
            onChange={() => null} />
        </div>
      </div>
      <div className={styles.info}>
        <InputGroup>
          <Input name="name" onChange={(v, n) => console.log(v, n)} placeholder="Name Surname" />
          <Input name="role" onChange={(v, n) => console.log(v, n)} placeholder="Role e.g. Sales Manager France" />
          <Input name="mobile" onChange={(v, n) => console.log(v, n)} placeholder="Mobile" label="M" />
          <Input name="phone" onChange={(v, n) => console.log(v, n)} placeholder="Phone" label="T" />
          <Input name="email" onChange={(v, n) => console.log(v, n)} placeholder="Email" label="E" />
        </InputGroup>
        <div className={styles.label}>
          Signature:
        </div>
        <div className={styles.signature}>
          <div className={styles.preview}>
            <img src={signature} />
          </div>
          <div className={styles.fileSelector}>
            <FileSelector label="Pick signature" onFileSelect={(v) => console.log(v)} />
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <Input name="description" area={true} onChange={(v, n) => console.log(v, n)} placeholder="Description" />
      </div>
    </div>
  );
}


export default Person;
