import * as React from 'react';
import { injectGlobal } from 'emotion';
import 'normalize.css/normalize.css';
import autobind from 'autobind-decorator';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import { bootstrap } from './utils/bootstrap';
import { setTheme, getTheme, themes } from './utils/themes';
import Application from './routes/Application';


injectGlobal`
  html, body, #root {
    height: 100%;
    font-family: 'Raleway', sans-serif;
    font-weight: 500;
  }
  :root {
    ${themes.common}
  }
`;


class App extends React.Component {
  state = {
    theme: getTheme(),
  }

  componentDidMount() {
    bootstrap();
  }

  render() {
    const { theme } = this.state;
    return (
      <Router>
        <Route render={({ location }) => (
          <Application toggleTheme={this._handleSetTheme} activeTheme={theme} location={location} />
        )} />
      </Router>
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
