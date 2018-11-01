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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
  themeSwitcher: css`
    margin: calc(var(--margin) * 2);
    margin-top: auto;
    display: flex;
    align-items: center;
    color: var(--text-primary);
    transition: all var(--transition-duration-short) ease-in-out;

    &:hover {
      cursor: pointer;
      color: var(--primary);
    }
  `,
  themeIcon: css`
    > * {
      display: none;
    }
  `,
  darkActive: css`
    [data-element="sun"] {
      display: none;
    }
    [data-element="moon"] {
      display: block;
    }
  `,
  lightActive: css`
    [data-element="sun"] {
      display: block;
    }
    [data-element="moon"] {
      display: none;
    }
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
        <span>{label}</span>
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
        <div className={cx(styles.themeIcon, {
          [styles.darkActive]: activeTheme === 'dark',
          [styles.lightActive]: activeTheme === 'light',
        })}>
          <i className={styles.icon} data-feather="sun" data-element="sun" />
          <i className={styles.icon} data-feather="moon" data-element="moon" />
        </div>
        <span>{activeTheme === 'light' ? 'Light mode' : 'Dark mode'}</span>
      </div>
    </div>
  );
};


export default withRouter(SideBar);