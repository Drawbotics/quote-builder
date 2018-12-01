import React from 'react';
import { injectGlobal } from 'emotion';
import 'normalize.css/normalize.css';
import autobind from 'autobind-decorator';
import { Router, Route } from 'react-router-dom';


import { bootstrap } from './utils/bootstrap';
import history from './utils/history';
import { setTheme, getTheme, themes } from './utils/themes';
import Application from './routes/Application';


injectGlobal`
  @font-face {
    font-family: 'Raleway';
    src: local('Raleway Medium'), local('Raleway-Medium'),
      url(https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwN4rWqZPANqczVs.woff2) format('woff2'),
      url('./fonts/Raleway-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Raleway';
    src: local('Raleway SemiBold'), local('Raleway-SemiBold'),
      url(https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwPIsWqZPANqczVs.woff2) format('woff2'),
      url('./fonts/Raleway-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'Raleway';
    src: local('Raleway Bold'), local('Raleway-Bold'),
      url(https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqhPANqczVsq4A.woff2) format('woff2'),
      url('./fonts/Raleway-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  html, body, #root {
    height: 100%;
    font-family: 'Raleway', sans-serif;
    font-weight: 500;
    font-size: 16px;
    overflow: hidden;
    -webkit-user-select: none;
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
      <Router history={history}>
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
