import React from 'react';
import { ErrorSummary, Header } from 'nhsuk-react-components';
import { FormattedMessage } from 'react-intl';

interface ErrorState {
  hasError: boolean;
}


export default class ErrorBoundary extends React.Component<any, ErrorState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  
  componentDidCatch(error) {
    console.log("caught error", error);
    // You can also log the error to an error reporting service
    // @TODO: Add sentry logging
  }
  
  render() {
    if (this.state.hasError) {
      return (       
        <>
          <Header >
            <Header.Container>
              <Header.Logo href="/" />
              <Header.ServiceName href="/">
                <FormattedMessage id="error.header" />
              </Header.ServiceName>
            </Header.Container>
          </Header>
          <ErrorSummary aria-labelledby="error-summary-title" role="alert" tabIndex={-1}>
            <ErrorSummary.Title id="error-summary-title"><FormattedMessage id="error.title"/></ErrorSummary.Title>
            <ErrorSummary.Body>
              <p><FormattedMessage id="error.body" /></p>
              <ErrorSummary.List>
                <ErrorSummary.Item href="#example-error-1">
                  <FormattedMessage id="error.resolution_1" />
                </ErrorSummary.Item>            
              </ErrorSummary.List>
            </ErrorSummary.Body>
          </ErrorSummary>
        </>
      );
    }
  
    return this.props.children; 
  }
}