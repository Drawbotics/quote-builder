import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { injectGlobal } from 'emotion';
import 'normalize.css/normalize.css';

import Main from './routes/Main';

injectGlobal`
  html, body {
    height: 100%;
    background: red;
  }
`;


class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Main}>
        </Route>
      </Router>
    );
  }
}


export default App;
