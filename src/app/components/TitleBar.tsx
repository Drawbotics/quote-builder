import React from 'react';
import { css } from 'emotion';
// import { Settings } from 'react-feather';


const styles = {
  titleBar: css`
    height: 50px;
    -webkit-app-region: drag;
    background: var(--tertiary);
    border-bottom: 1px solid var(--line-color);
    transition: all var(--transition-duration) ease-in-out;
    display: flex;
    align-items: center;
    padding: 0 var(--padding);
  `,
  title: css`
    color: var(--text-primary);
    transition: all var(--transition-duration) ease-in-out;
  `,
  label: css`
    color: var(--grey);
    margin-right: calc(var(--margin) / 2);
  `,
  settings: css`
    margin-left: auto;
    color: var(--text-primary);
    transition: all var(--transition-duration) ease-in-out;
    padding: 5px;

    &:hover {
      color: var(--primary);
    }
  `,
};


const TitleBar: React.SFC<{
  title: string,
}> = ({
  title,
}) => {
  return (
    <div className={styles.titleBar} id="title-bar">
      {title ?
        <div className={styles.title}>
          <span className={styles.label}>Editing</span>
          {title}
        </div>
      : null}
      {/* <div className={styles.settings}>
        <Settings size={20} />
      </div> */}
    </div>
  );
}


export default TitleBar;
