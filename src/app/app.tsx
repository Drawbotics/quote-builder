import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { injectGlobal } from 'emotion';
import 'normalize.css/normalize.css';
import autobind from 'autobind-decorator';

import { bootstrap } from './utils/bootstrap';
import { setTheme, getTheme } from './utils/themes';
import Main from './routes/Main';
import Document from './routes/Document';
import TitleBar from './components/TitleBar';

bootstrap();


injectGlobal`
  html, body {
    height: 100%;
  }
`;


class App extends React.Component {
  state = {
    theme: getTheme(),
  }

  render() {
    return (
      <div onClick={this._handleSetTheme}>
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

  @autobind
  _handleSetTheme() {
    const { theme } = this.state;
    const newTheme = theme === 'light' ? 'dark' : 'light';
    this.setState({ theme: newTheme });
    setTheme(newTheme);
  }
}


export default App;
