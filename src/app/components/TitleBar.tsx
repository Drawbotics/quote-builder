import React from 'react';
import { css } from 'emotion';


const styles = {
  titleBar: css`
    height: 100px;
    -webkit-app-region: drag;
    background: var(--tertiary);
    border-bottom: 1px solid var(--line-color);
    transition: all var(--transition-duration) ease-in-out;
    display: flex;
    align-items: center;
    padding-left: var(--padding);
  `,
  title: css`
    color: var(--text-primary);
    transition: all var(--transition-duration) ease-in-out;
  `,
  label: css`
    color: var(--grey);
    margin-right: calc(var(--margin) / 2);
  `,
};


const TitleBar: React.SFC<{
  title: string,
}> = ({
  title,
}) => {
  return (
    <div className={styles.titleBar}>
      {title ?
        <div className={styles.title}>
          <span className={styles.label}>Editing</span>
          {title}
        </div>
      : null}
    </div>
  );
}


export default TitleBar;
