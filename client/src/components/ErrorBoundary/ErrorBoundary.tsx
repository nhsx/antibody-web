import React, { ReactElement, useState } from 'react';
import { ErrorSummary, Container } from 'nhsuk-react-components';
import { FormattedMessage } from 'react-intl';
import PageContent from 'components/ui/PageContent';
import MainContent from 'components/ui/MainContent';
import * as Sentry from '@sentry/browser';

interface ErrorState {
  hasError: boolean;
  eventId: string;
}

interface ErrorBoundaryProps {
  errorComponent?: ReactElement;
}

interface DefaultErrorProps {
  eventId: string
}

const DefaultError = (props: DefaultErrorProps) => {

  const [showingCode, setShowingCode] = useState<Boolean>(false);


  return (<ErrorSummary
    data-testid="default-error"
    aria-labelledby="error-summary-title"
    role="alert"
    tabIndex={-1}>
    <ErrorSummary.Title
      id="error-summary-title"
    >
      <FormattedMessage id="error.title"/>
    </ErrorSummary.Title>
    <ErrorSummary.Body>
    
      <p><FormattedMessage id="error.body" /></p>
      <ErrorSummary.List>
        <ErrorSummary.Item
          href="#example-error-1"
          onClick={() => setShowingCode(!showingCode)}>
          <FormattedMessage id="error.fix" />
        </ErrorSummary.Item>            
      </ErrorSummary.List>
      {showingCode && <FormattedMessage
        id="error.reference"
        values={{ eventId: props.eventId }} />}
    </ErrorSummary.Body>
  </ErrorSummary>);
};


export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, eventId: '' };
  }
  
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    if (!error.message.includes("Test Error")) {
      console.log("Caught error", error);
    }

    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
    // You can also log the error to an error reporting service
    // @TODO: Add sentry logging
  }
  
  render() {

    if (this.state.hasError) {
      return (       
        <PageContent>
          <Container>
            <MainContent>
              {this.props.errorComponent || <DefaultError eventId={this.state.eventId}/>}
            </MainContent>
          </Container>
        </PageContent>
      );
    }
  
    return this.props.children; 
  }
}