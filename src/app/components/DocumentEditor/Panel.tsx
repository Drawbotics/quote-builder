import React from 'react';
import { css } from 'emotion';
import { ChevronRight } from 'react-feather';


const styles = {
  panel: css`
    height: 100%;
    background: var(--tertiary-transparent);
    border-left: 1px solid var(--line-color);
    padding: var(--padding);
    transition: all var(--transition-duration) ease-in-out;
    backdrop-filter: blur(3px);
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  `,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: var(--padding);
  `,
  label: css`
    font-size: 0.9rem;
    color: var(--grey);
    transition: color var(--transition-duration) ease-in-out;
  `,
  icon: css`
    color: var(--grey);
    margin-bottom: -6px;
    margin-left: calc(var(--padding) / -2);
    margin-right: var(--padding);

    &:hover {
      cursor: pointer;
      color: var(--text-primary);
    }
  `,
  body: css`
    flex: 1;
    min-height: 0;
    overflow: scroll;
    margin: -5px;
    padding: 5px;
    padding-bottom: calc(var(--padding) * 3);
    padding-right: calc(var(--padding) * 2);
    margin-right: calc(var(--padding) * -2);
  `,
};


const Panel: React.SFC<{
  title: string,
  children: React.ReactChildren | React.ReactNode,
  onClick: () => void,
}> = ({
  title,
  children,
  onClick,
}) => {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.icon} onClick={onClick}>
          <ChevronRight size={20} />
        </div>
        <div className={styles.label}>
          {title}
        </div>
      </div>
      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
};


export default Panel;
