import React from 'react';
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
    font-size: 16px;
  }
  :root {
    ${themes.common}
  }
`;


interface AppState {
  theme?: string
}


class App extends React.Component {
  state: AppState = {}

  async componentWillMount() {
    bootstrap();
    
    const theme = await getTheme();
    this.setState({ theme });
  }

  render() {
    const { theme } = this.state;
    if (! theme) {
      return 'loading';
    }
    return (
      <Router>
        <Route render={(props) => (
          <Application
            toggleTheme={this._handleSetTheme}
            activeTheme={theme}
            {...props} />
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
