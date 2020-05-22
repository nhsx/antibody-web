import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';


export const renderWithReactIntl = component => {
  return render(<IntlProvider locale="en-gb">{component}</IntlProvider>);
};