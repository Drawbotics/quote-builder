import * as React from 'react';
import { css, cx } from 'emotion';
import { Link } from 'react-router-dom';


const styles = {
  sideBar: css`
    width: 270px;
    height: 100%;
    background: var(--tertiary);
    border-right: 1px solid var(--line-color);
    transition: all var(--transition-duration) ease-in-out;
    transition-property: background, border-right;
  `,
  closed: css`
    width: 100px;
  `,
  logoContainer: css`
    border-bottom: 1px solid var(--line-color);
    transition: border-bottom var(--transition-duration) ease-in-out;
    height: 100px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  `,
  navigation: css`
    padding: var(--padding);
  `,
  navigationButton: css`

  `,
  icon: css`
  `,
  label: css`

  `,
  themeSwitcher: css`
  `,
};


const NavigationButton: React.SFC<{ icon: string, label: string, to: string }> = ({ icon, label, to }) => {
  return (
    <Link to={to}>
      <div className={styles.navigationButton}>
        <i className={styles.icon} data-feather={icon} />
        <div className={styles.label}>
          {label}
        </div>
      </div>
    </Link>
  );
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
      <div className={styles.navigation}>
        <NavigationButton label="My quotes" icon="file" to="/quotes" />
        <NavigationButton label="My exports" icon="download-cloud" to="/exports" />
        <NavigationButton label="People" icon="users" to="/people" />
      </div>
      <div className={styles.themeSwitcher} onClick={toggleTheme}>
        {activeTheme}
      </div>
    </div>
  );
};


export default SideBar;
