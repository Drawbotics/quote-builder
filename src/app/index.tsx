import React from 'react';
import ReactDOM from 'react-dom';

// import App from './app';


ReactDOM.render(
  // <App />,
  <h1>Hi</h1>,
  document.getElementById('root') as HTMLElement,
);


if (module.hot) {
  module.hot.accept();
}
