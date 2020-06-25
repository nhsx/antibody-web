import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'components/App/App';
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/browser';

if (process.env.REACT_APP_STAGE === "prod") {
  Sentry.init({ dsn: 'https://2429c9470d954253b9190e461d2cc300@o406048.ingest.sentry.io/5272690' });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Register our service worker so we can handle push notifications

serviceWorker.register();