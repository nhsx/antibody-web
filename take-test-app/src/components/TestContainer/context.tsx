import React from 'react';
import { TestAction, TestState } from './reducer';

export interface TestContext {
  state: TestState;
  dispatch: React.Dispatch<TestAction>;
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
