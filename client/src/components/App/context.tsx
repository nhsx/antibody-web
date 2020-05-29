import React from 'react';
import { AppAction, AppState } from './reducer';
import { AppContainer } from './container';
import AppError from 'errors/AppError';

export interface AppContext {
  state: AppState;
  setLocale: (locale: string) => void;
  setAppError: (error: AppError | null) => void;
  dispatch: React.Dispatch<AppAction>;
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
