import React from 'react';
import { css, cx } from 'emotion';
import { Link, withRouter } from 'react-router-dom';
import { DownloadCloud, Users, File, Sun, Moon } from 'react-feather';

import logo from '../images/qtp-logo.svg';
import logoAlt from '../images/qtp-logo-alt.svg';


const styles = {
  sideBar: css`
    width: 270px;
    height: 100%;
    background: var(--tertiary);
    border-right: 1px solid var(--line-color);
    transition: background var(--transition-duration) ease-in-out,
      border-right var(--transition-duration) ease-in-out,
      width var(--transition-duration-short) ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  `,
  closed: css`
    width: 90px;

    & [data-element="logo"] {
      > img {
        opacity: 0 !important;
        width: 0;
      }
    }

    & [data-element="label"] {
      opacity: 0;
      pointer-events: none;
      width: 0;
    }

    & [data-element="nav-icon"] {
      margin-right: 0;
    }

    & [data-element="navigation-button"] {
      padding: var(--padding);
      justify-content: center;
    }

    & [data-element="switcher"] {
      justify-content: center;
    }

    & [data-element="sun"], [data-element="moon"] {
      margin-right: 0;
    }
  `,
  logoContainer: css`
    position: relative;
    border-bottom: 1px solid var(--line-color);
    transition: border-bottom var(--transition-duration) ease-in-out;
    height: 100px;
    pointer-events: none;

    > img {
      position: absolute;
      bottom: var(--margin);
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - var(--margin) * 3);
      transition: opacity var(--transition-duration) ease-in-out;
    }
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
    white-space: nowrap;

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
    margin-right: calc(var(--margin) / 2);
  `,
  themeSwitcher: css`
    margin: calc(var(--margin) * 2);
    margin-top: auto;
    display: flex;
    align-items: center;
    color: var(--text-primary);
    transition: all var(--transition-duration-short) ease-in-out;
    white-space: nowrap;

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
  icon: React.ReactElement<{}>,
  label: string,
  to: string,
  active: boolean,
}> = ({ icon, label, to, active }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <div className={cx(styles.navigationButton, { [styles.active]: active })} data-element="navigation-button">
        <div className={styles.icon} data-element="nav-icon">
          {icon}
        </div>
        <span data-element="label">{label}</span>
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
      <div className={styles.logoContainer} data-element="logo">
        <img src={logo} style={{ opacity: activeTheme === 'light' ? 1 : 0 }} />
        <img src={logoAlt} style={{ opacity: activeTheme === 'dark' ? 1 : 0 }} />
      </div>
      <div className={styles.navigation}>
        <NavigationButton label="My quotes" icon={<File size={20} />} to="/quotes" active={pathname !== '/exports' && pathname !== '/people'} />
        <NavigationButton label="My exports" icon={<DownloadCloud size={20} />} to="/exports" active={pathname === '/exports'} />
        <NavigationButton label="People" icon={<Users size={20} />} to="/people" active={pathname === '/people'} />
      </div>
      <div className={styles.themeSwitcher} onClick={toggleTheme} data-element="switcher">
        <div className={cx(styles.themeIcon, {
          [styles.darkActive]: activeTheme === 'dark',
          [styles.lightActive]: activeTheme === 'light',
        })}>
          <div className={styles.icon} data-element="sun">
            <Sun size={20} />
          </div>
          <div className={styles.icon} data-element="moon">
            <Moon size={20} />
          </div>
        </div>
        <span data-element="label">{activeTheme === 'light' ? 'Light mode' : 'Dark mode'}</span>
      </div>
    </div>
  );
};


export default withRouter(SideBar);
