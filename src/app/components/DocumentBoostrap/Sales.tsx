import React from 'react';
import { css } from 'emotion';


// interface SalesValues {
//   dunno: string
// }


const styles = {
  sales: css`
  `,
}


const Sales: React.SFC<{
  onChange: any,
  value: any,
}> = () => {
  return (
    <div className={styles.sales}>

    </div>
  );
}


export default Sales;
