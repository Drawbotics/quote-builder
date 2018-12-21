import React from 'react';
import { css } from 'emotion';
import { get } from 'lodash';

import TableEditor, { TableType } from '../TableEditor';


interface OfferTableValue {
  tables: TableType[]
}


const styles = {
  offerTable: css`
  `,
}


const OfferTable: React.SFC<{
  onChange: (v: TableType[], k: string) => void,
  value: OfferTableValue,
}> = ({ onChange, value }) => {
  const tables = get(value, 'tables', []);
  return (
    <div className={styles.offerTable}>
      <TableEditor tables={tables} onChange={(v) => onChange(v, 'tables')} />
    </div>
  );
}


export default OfferTable;
