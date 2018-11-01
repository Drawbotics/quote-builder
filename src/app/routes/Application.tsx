import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { css } from 'emotion';

import Quotes from './Quotes';
import Document from './Document';
import People from './People';
import Exports from './Exports';
import TitleBar from '../components/TitleBar';
import SideBar from '../components/SideBar';


const styles = {
  application: css`
    display: flex;
    align-items: stretch;
    height: 100%;
  `,
  sidebar: css`
  `,
  sidebarContent: css`
    flex: 1;
    display: flex;
    flex-direction: column;
  `,
  container: css`
    flex: 1;
    background: var(--background-color);
    transition: background var(--transition-duration) ease-in-out;
  `,
};


class Application extends React.Component<{
  toggleTheme: () => void,
  activeTheme: string,
}> {

  state = {
    sidebarOpen: true,
  }

  render() {
    const { toggleTheme, activeTheme } = this.props;
    const { sidebarOpen } = this.state;
    return (
      <div className={styles.application}>
        <div className={styles.sidebar}>
          <SideBar
            toggleTheme={toggleTheme}
            activeTheme={activeTheme}
            open={sidebarOpen} />
        </div>
        <div className={styles.sidebarContent}>
          <TitleBar />
          <div className={styles.container}>
            <Switch>
              <Route path="/:id/edit" component={Document} />
              <Route path="/new" component={Document} />
              <Route path="/people" component={People} />
              <Route path="/exports" component={Exports} />
              <Route path="/quotes" component={Quotes} />
              <Redirect from="/" to="/quotes" />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}


export default Application;
