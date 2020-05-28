import React from 'react';
import { TestState } from './reducer';

export interface TestContext {
  state: TestState;
  dispatch: Function;
}

const Context = React.createContext<TestContext | null>(null);

// Higher-order component for consuming context easily
export const withTest = Component => props => (
  <Context.Consumer>
    {test => <Component
      {...props}
      test={test} />}
  </Context.Consumer>
);

export default Context;
