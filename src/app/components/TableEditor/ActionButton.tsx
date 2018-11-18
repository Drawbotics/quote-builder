import React from 'react';
import { css } from 'emotion';


const styles = {
  actionButton: css`
    height: 30px;
    width: 30px;
    border-radius: 1000px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--secondary);
    color: var(--text-primary);
    transition: all var(--transition-duration-short) ease-in-out;

    &:hover {
      cursor: pointer;
      background: var(--primary);
      color: var(--white);
    }
  `,
}


const ActionButton: React.SFC<{
  onClick: () => void,
  label: string,
}> = ({ label, onClick }) => {
  return (
    <div className={styles.actionButton} onClick={onClick}>
      {label}
    </div>
  );
}


export default ActionButton;
