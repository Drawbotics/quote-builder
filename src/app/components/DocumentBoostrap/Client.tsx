import React from 'react';
import { css } from 'emotion';
import { get } from 'lodash';

import Input, { InputGroup } from '../Input';


interface ClientValue {
  companyName: string
  contactName: string
}


const styles = {
  client: css`
    width: 400px;
  `,
}


const Client: React.SFC<{
  onChange: (v: string, k: string) => void,
  value: ClientValue,
}> = ({ onChange, value }) => {
  const { companyName, contactName } = get(value, '', {});
  return (
    <div className={styles.client}>
      <InputGroup>
        <Input name="company" onChange={onChange} placeholder="Company name" value={companyName} />
        <Input name="contact" onChange={onChange} placeholder="Contact name" value={contactName} />
      </InputGroup>
    </div>
  );
}


export default Client;
