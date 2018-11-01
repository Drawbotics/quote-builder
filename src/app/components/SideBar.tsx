import * as React from 'react';
import { css, cx } from 'emotion';


const styles = {
  sideBar: css`
    width: 270px;
    height: 100%;
    background: var(--tertiary);
    border-right: 1px solid var(--line-color);
    transition: all var(--transition-duration) ease-in-out;
  `,
  closed: css`
    width: 100px;
  `,
  logoContainer: css`
    border-bottom: 1px solid var(--line-color);
    transition: border-bottom var(--transition-duration) ease-in-out;
    height: 100px;
  `,
  themeSwitcher: css`
  `,
};


const SideBar: React.SFC<{
  toggleTheme: () => void,
  activeTheme: string,
  open: boolean,
}> = ({ toggleTheme, activeTheme, open }) => {
  return (
    <div className={cx(styles.sideBar, { [styles.closed]: ! open })}>
      <div className={styles.logoContainer}>
      </div>
      <div className={styles.themeSwitcher} onClick={toggleTheme}>
        {activeTheme}
      </div>
    </div>
  );
}


export default SideBar;
