import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from 'i18n/index';
import { flatten } from 'flat';
import AppContext, { AppContext as AppContextType } from 'components/App/context';

export const renderWithReactIntl = component => {
  return render(<IntlProvider
    locale="en-gb"
    messages={flatten(messages["en-gb"])}>
    {component}
  </IntlProvider>);
};

export const renderWithStubAppContext = (component): [RenderResult, AppContextType] => {
  const testApi = {
    generateTest: (): any => ({ testRecord: { timerStartedAt: 10 } }),
    uploadImage: (): any => { },
    interpretResult: (): any => { },
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