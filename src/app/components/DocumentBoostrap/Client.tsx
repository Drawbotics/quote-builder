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
  const companyName = get(value, 'companyName', '');
  const contactName = get(value, 'contactName', '');
  return (
    <div className={styles.client}>
      <InputGroup>
        <Input name="companyName" onChange={onChange} placeholder="Company name" value={companyName} />
        <Input name="contactName" onChange={onChange} placeholder="Contact name" value={contactName} />
      </InputGroup>
    </div>
  );
}


export default Client;
