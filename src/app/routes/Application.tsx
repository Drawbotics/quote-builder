import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { css } from 'emotion';

import Main from './Main';
import Document from './Document';
import TitleBar from '../components/TitleBar';
import SideBar from '../components/SideBar';


const styles = {
  application: css`
    display: flex;
    align-items: stretch;
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
            <Router>
              <Switch>
                <Route path="/edit" component={Document} />
                <Route path="/" component={Main} />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}


export default Application;
