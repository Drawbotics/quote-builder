import * as React from 'react';
import { injectGlobal } from 'emotion';
import 'normalize.css/normalize.css';
import autobind from 'autobind-decorator';

import { bootstrap } from './utils/bootstrap';
import { setTheme, getTheme } from './utils/themes';
import Application from './routes/Application';

bootstrap();

injectGlobal`
  html, body {
    height: 100%;
    font-family: 'Raleway', sans-serif;
  }
`;


class App extends React.Component {
  state = {
    theme: getTheme(),
  }

  render() {
    return (
      <div onClick={this._handleSetTheme}>
        <Application />
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
