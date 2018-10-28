import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { injectGlobal } from 'emotion';
import 'normalize.css/normalize.css';

import Main from './routes/Main';
import Document from './routes/Document';
import TitleBar from './components/TitleBar';


injectGlobal`
  html, body {
    height: 100%;
  }
`;


class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <TitleBar />
          <Route path="/" component={Main} />
          <Route path="/edit" component={Document} />
        </Switch>
      </Router>
    );
  }
}


export default App;
