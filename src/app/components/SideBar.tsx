import * as React from 'react';
import { css, cx } from 'emotion';
import { Link, withRouter } from 'react-router-dom';


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
    padding: var(--padding) 0;
  `,
  navigationButton: css`
    position: relative;
    display: flex;
    align-items: center;
    padding: var(--padding) calc(var(--padding) * 2);
    color: var(--text-primary);
    transition: all var(--transition-duration-short) ease-in-out;

    &:hover {
      color: var(--primary);
    }

    &::after {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background: var(--primary);
      transform: scaleX(0);
      transform-origin: left;
      transition: all var(--transition-duration-short) ease-in-out;
    }
  `,
  active: css`
    background: var(--primary-transparent);
    color: var(--primary);

    &::after {
      transform: scaleX(1);
    }
  `,
  icon: css`
    height: 20px;
    margin-right: calc(var(--margin) / 2);
  `,
  label: css`

  `,
  themeSwitcher: css`
  `,
};


const NavigationButton: React.SFC<{
  icon: string,
  label: string,
  to: string,
  active: boolean,
}> = ({ icon, label, to, active }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <div className={cx(styles.navigationButton, { [styles.active]: active })}>
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
  history: any,
  location: any,
  match: any,
}> = ({ toggleTheme, activeTheme, open, location }) => {
  const { pathname } = location;
  return (
    <div className={cx(styles.sideBar, { [styles.closed]: ! open })}>
      <div className={styles.logoContainer}>
      </div>
      <div className={styles.navigation}>
        <NavigationButton label="My quotes" icon="file" to="/quotes" active={pathname === '/quotes'} />
        <NavigationButton label="My exports" icon="download-cloud" to="/exports" active={pathname === '/exports'} />
        <NavigationButton label="People" icon="users" to="/people" active={pathname === '/people'} />
      </div>
      <div className={styles.themeSwitcher} onClick={toggleTheme}>
        {activeTheme}
      </div>
    </div>
  );
};


export default withRouter(SideBar);
