import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from 'i18n/index';
import { flatten } from 'flat';

export const renderWithReactIntl = component => {
  return render(<IntlProvider 
    locale="en-gb" 
    messages={flatten(messages["en-gb"])}>
    {component}
  </IntlProvider>);
};