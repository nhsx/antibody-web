import React from 'react';
import { AppState } from './reducer';
import { AppContainer } from './container';

export interface AppContext {
  state: AppState;
  setLocale: Function;
  setAppError: Function;
  dispatch: Function;
  container: AppContainer;
}

const Context = React.createContext<AppContext | null>(null);

// Higher-order component for consuming context easily
export const withApp = Component => props => (
  <Context.Consumer>
    {app => <Component
      {...props}
      app={app} />}
  </Context.Consumer>
);

export default Context;
