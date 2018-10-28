import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { injectGlobal } from 'emotion';
import 'normalize.css/normalize.css';

import Main from './routes/Main';
import Document from './routes/Document';

injectGlobal`
  html, body {
    height: 100%;
    background: blue;
  }
`;


class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Main} />
          <Route path="/edit" component={Document} />
        </Switch>
      </Router>
    );
  }
}


export default App;
