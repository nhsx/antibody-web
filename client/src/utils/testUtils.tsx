import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from 'i18n/index';
import { flatten } from 'flat';
import AppContext from 'components/App/context';

export const renderWithReactIntl = component => {
  return render(<IntlProvider
    locale="en-gb"
    messages={flatten(messages["en-gb"])}>
    {component}
  </IntlProvider>);
};

export const renderWithStubAppContext = component => {
  const appContext = {
    state: { locale: "en-gb" },
    setLocale: () => { },
    setAppError: () => { },
    dispatch: () => { },
    container: {
      getLogin: () => (): any => { },
      getUserApi: () => ({
        authenticate: (): any => ({ success: true, token: 'testToken' })
      }),
      getTestApi: () => ({
        generateTest: (): any => ({ testRecord: { timerStartedAt: 10 } }),
        uploadImage: (): any => { },
        interpretResult: (): any => { },
        updateTest: (): any => { }
      })
    }
  };

  return render(
    <AppContext.Provider value={appContext} >
      <IntlProvider
        locale="en-gb"
        messages={flatten(messages["en-gb"])}>
        {component}
      </IntlProvider>
    </AppContext.Provider >
  );
};