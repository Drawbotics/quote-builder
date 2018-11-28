import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { css } from 'emotion';

import Quotes from './Quotes';
import Document from './Document';
import People from './People';
import Exports from './Exports';
import TitleBar from '../components/TitleBar';
import SideBar from '../components/SideBar';
import AnimatedSwitch from '../components/AnimatedSwitch';


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
    min-width: 1000px;
  `,
  container: css`
    flex: 1;
    background: var(--background-color);
    transition: background var(--transition-duration) ease-in-out;
    overflow-y: scroll;
    display: flex;
  `,
};


class Application extends React.Component<{
  toggleTheme: () => void,
  activeTheme: string,
  location: any,
  match: any,
}> {
  state = {
    title: '',
  }

  render() {
    const { title } = this.state;
    const { toggleTheme, activeTheme, location } = this.props;
    const sidebarOpen = location.pathname !== '/new' && ! location.pathname.includes('/edit');
    return (
      <div className={styles.application}>
        <div className={styles.sidebar}>
          <SideBar
            toggleTheme={toggleTheme}
            activeTheme={activeTheme}
            open={sidebarOpen} />
        </div>
        <div className={styles.sidebarContent}>
          <TitleBar title={title} />
          <div className={styles.container}>
            <AnimatedSwitch location={location}>
              <Route path="/:id/edit" render={(props) => <Document {...props} setDocumentTitle={(title) => this.setState({ title })} />} />
              <Route path="/new" render={(props) => <Document {...props} setDocumentTitle={(title) => this.setState({ title })} />} />
              <Route path="/people" component={People} />
              <Route path="/exports" component={Exports} />
              <Route path="/quotes" component={Quotes} />
              <Redirect from="/" to="/quotes" />
            </AnimatedSwitch>
          </div>
        </div>
      </div>
    );
  }
}


export default Application;
