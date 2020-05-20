import React from 'react';
import { AppState } from './reducer';

interface AppContextInterface {
  state: AppState;
  setLocale: Function;
}

const AppContext = React.createContext<AppContextInterface | null>(null);

// Higher-order component for consuming context easily
export const withApp = Component => props => (
  <AppContext.Consumer>
    {app => <Component {...props} app={app} />}
  </AppContext.Consumer>
);

export default AppContext;
