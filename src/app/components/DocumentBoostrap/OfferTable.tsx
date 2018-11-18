import React from 'react';
import { css } from 'emotion';

import TableEditor, { TableType } from '../TableEditor';


interface OfferTableValue {
  table: TableType[]
}


const styles = {
  offerTable: css`
    min-width: 1000px;
  `,
}


const OfferTable: React.SFC<{
  onChange: (v: TableType, k: string) => void,
  value: OfferTableValue,
}> = ({ onChange, value }) => {
  return (
    <div className={styles.offerTable}>
      <TableEditor />
    </div>
  );
}


export default OfferTable;
