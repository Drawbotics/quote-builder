import React from 'react';
import { css } from 'emotion';

import Tabs from './Tabs';
import ProfilePicture from './ProfilePicture';
import Input, { InputGroup } from './Input';


const styles = {
  person: css`
    display: flex;
    align-items: flex-start;
  `,
  profile: css`
    margin-right: var(--margin);
  `,

  langSwitcher: css`
    margin-top: var(--margin);
    display: flex;
    justify-content: center;
  `,
  info: css`
    flex: 0.4;
  `,
  description: css`
    flex: 0.5;
  `,
};


const pic = 'http://s3.amazonaws.com/cdn.roosterteeth.com/uploads/images/36437c1c-f403-42c3-a3a0-4886a49bd012/original/2195219-1449924847806-image-2.jpg';


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
        </InputGroup>
      </div>
      <div className={styles.description}>
      </div>
    </div>
  );
}


export default Person;
