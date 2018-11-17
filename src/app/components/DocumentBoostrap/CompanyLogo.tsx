import React from 'react';
import { css } from 'emotion';

import FileSelector from '../FileSelector';
import AnimatedCheckmark from '../AnimatedCheckmark';


interface CompanyLogoValue {
  logo: string
}


const styles = {
  companyLogo: css`
    position: relative;
  `,
  fileSelector: css`
    width: 400px;
    height: 200px;
    display: flex;
  `,
  confirm: css`
    position: absolute;
    top: var(--margin);
    right: var(--margin);
  `,
}


const CompanyLogo: React.SFC<{
  onChange: (v: string, k: string) => void,
  value: CompanyLogoValue,
}> = ({ onChange, value }) => {
  return (
    <div className={styles.companyLogo}>
      <div className={styles.fileSelector}>
        <FileSelector label="Click to import" onFileSelect={(file) => onChange(file, 'logo')} />
      </div>
      <div className={styles.confirm}>
        {value ? <AnimatedCheckmark /> : null}
      </div>
    </div>
  );
}


export default CompanyLogo;
