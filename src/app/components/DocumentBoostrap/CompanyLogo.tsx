import React from 'react';
import { css } from 'emotion';


// interface CompanyLogoValue {
//   data: string
// }


const styles = {
  companyLogo: css`
  `,
}


const CompanyLogo: React.SFC<{
  onChange: any,
  value: any,
}> = () => {
  return (
    <div className={styles.companyLogo}>

    </div>
  );
}


export default CompanyLogo;
