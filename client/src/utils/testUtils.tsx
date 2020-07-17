import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from 'i18n/index';
import { flatten } from 'flat';
import AppContext, { AppContext as AppContextType } from 'components/App/context';
import TestContext, { TestContext as TestContextType } from 'components/TestContainer/context';
import TestRecord from 'abt-lib/models/TestRecord';
export const renderWithReactIntl = component => {
  return render(<IntlProvider
    locale="en-gb"
    messages={flatten(messages["en-gb"])}>
    {component}
  </IntlProvider>);
};


const defaultRecord: TestRecord = {
  guid: 'test',
  uploadUrl: 'testup',
  downloadUrl: 'testdown',
  timerStartedAt: new Date('2020-07-01T00:00:00').getTime(),
  step: "checkYourKit",
  testCompleted: false
};


/* Renduces boilerplate in tests by passing partial properties to the stub context to overwrite the defaults */
export const renderWithStubTestContext = (component: JSX.Element, recordProperties: Partial<TestRecord>): [RenderResult, AppContextType, TestContextType] => {

  const testContext : TestContextType = {
    state: {
      testRecord: { ...defaultRecord, ...recordProperties }
    },
    dispatch: () => { }
  };

  const [result, appContext] = renderWithStubAppContext(
    <TestContext.Provider value={testContext}>
      {component}
    </TestContext.Provider>
  );

  return [result, appContext, testContext];
};

export const renderWithStubAppContext = (component, api = {}): [RenderResult, AppContextType] => {
  const testApi = {
    generateTest: jest.fn((): any => ({ testRecord: { timerStartedAt: 10 } })),
    uploadImage: jest.fn((): any => { }),
    interpretResult: jest.fn((): any => { }),
    updateTest: jest.fn()
  };

  const appContext = {
    state: { locale: "en-gb" },
    setLocale: () => { },
    setAppError: () => { },
    dispatch: () => { },
    container: {
      getLogin: () => (): any => { },
      getTestApi: jest.fn(() => testApi)
    }
  };

  return [render(
    <AppContext.Provider value={appContext} >
      <IntlProvider
        locale="en-gb"
        messages={flatten(messages["en-gb"])}>
        {component}
      </IntlProvider>
    </AppContext.Provider >
  ), appContext];
};