import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: process.env.REACT_APP_AWS_REGION,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_USER_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
