import React from 'react';
import { css, cx } from 'emotion';


const styles = {
  tabs: css`
    display: flex;
    align-items: stretch;
    border-radius: var(--border-radius);
    overflow: hidden;
  `,
  tab: css`
    padding: calc(var(--padding) / 2) var(--padding);
    background: var(--tertiary);
    color: var(--text-primary);
    font-size: 0.9rem;
    transition: all var(--transition-duration) ease-in-out;

    &:hover {
      cursor: pointer;
      background: var(--secondary);
      transition: background calc(var(--transition-duration) / 2) ease-in-out;
    }
  `,
  active: css`
    background: var(--primary) !important;
    color: var(--white);
    box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.15);
    z-index: 9;
  `,
}


interface TabObject {
  label: string,
  value: string,
}


const Tabs: React.SFC<{
  tabs: TabObject[],
  onChange: (v: string) => void,
  value: string,
}> = ({ tabs, onChange, value }) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab, i) => (
        <div key={i} className={cx(styles.tab, { [styles.active]: value === tab.value })} onClick={() => onChange(tab.value)}>
          {tab.label}
        </div>
      ))}
    </div>
  );
}


export default Tabs;
