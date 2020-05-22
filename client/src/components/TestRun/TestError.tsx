import React, { useEffect } from 'react';
import { ErrorSummary } from 'nhsuk-react-components';
import { FormattedMessage } from 'react-intl';
import enMsgs from 'i18n/en-gb.json';
import flatten from 'flat';
import ApiError from 'errors/ApiError';
interface TestErrorProps {
  titleId?: string;
  bodyId?: string;
  fixId?: string[];
  code?: string;
  error: ApiError;
}


// You can supply an error object and it will pull translated messages in based on its code, or provide messageIds directly for a custom error msg
export default (props: TestErrorProps) => {
  // Scroll so error is in view. We can use more heavyweight solutions if we ever want errors that aren't at the top of the page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ErrorSummary
      aria-labelledby="error-summary-title"
      role="alert"
      tabIndex={-1}>
      <ErrorSummary.Title id="error-summary-title">
        <FormattedMessage id={props.titleId || `error.codes.${props.error.code}.title`}/>
      </ErrorSummary.Title>
      <ErrorSummary.Body>
        <p>
          <FormattedMessage id={props.bodyId || `error.codes.${props.error.code}.body`}/>
        </p>
        <ErrorSummary.List>
          {props.fixId && (
            <ErrorSummary.Item>
              <FormattedMessage id={props.bodyId} />
            </ErrorSummary.Item>
          )}
          {flatten(enMsgs)[`error.codes.${props.error.code}.fix`] && (
            <ErrorSummary.Item
              href="#try-again"
              onClick={props.error.onFix}>
              <FormattedMessage id={`error.codes.${props.error.code}.fix`} />
            </ErrorSummary.Item>             
          )}
        </ErrorSummary.List>
      </ErrorSummary.Body>
    </ErrorSummary>);
};

