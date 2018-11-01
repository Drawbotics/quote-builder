import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './Main';
import Document from './Document';
import TitleBar from '../components/TitleBar';


class Application extends React.Component {
  render() {
    return (
      <div>
        <TitleBar />
        <Router>
          <Switch>
            <Route path="/edit" component={Document} />
            <Route path="/" component={Main} />
          </Switch>
        </Router>
      </div>
    );
  }
}


export default Application;
