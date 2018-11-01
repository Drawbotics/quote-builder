import * as React from 'react';
import { css, cx } from 'emotion';


const styles = {
  sideBar: css`
    width: 300px;
  `,
  closed: css`
    width: 100px;
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
      <div className={styles.themeSwitcher} onClick={toggleTheme}>
        {activeTheme}
      </div>
    </div>
  );
}


export default SideBar;
