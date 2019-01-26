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
import { toggleMenuItems } from '../utils';


const styles = {
  application: css`
    display: flex;
    align-items: stretch;
    height: 100%;
    min-width: 1200px;
    overflow: hidden;
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
    overflow-y: scroll;
    overflow-x: hidden;
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
    prevPath: '',
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({ prevPath: this.props.location.pathname });
    }
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      toggleMenuItems(this.props.location.pathname);
    }
  }

  render() {
    const { title, prevPath } = this.state;
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
              <Route path="/:id/edit" render={(props) => <Document {...props} editing={true} setDocumentTitle={(title) => this.setState({ title })} />} />
              <Route path="/new" component={Document} />
              <Route path="/people" component={People} />
              <Route path="/exports" component={Exports} />
              <Route path="/quotes" render={(props) => <Quotes {...props} firstLoad={prevPath === '/'} />} />
              <Redirect from="/" to="/quotes" />
            </AnimatedSwitch>
          </div>
        </div>
      </div>
    );
  }
}


export default Application;
