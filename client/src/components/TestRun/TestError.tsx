import React from 'react';
import { ErrorSummary } from 'nhsuk-react-components';
import { FormattedMessage } from 'react-intl';
import enMsgs from 'i18n/en-gb.json';
import flatten from 'flat';

interface TestErrorProps {
  titleId?: string;
  bodyId?: string;
  fixId?: string[];
  code?: string;
}


// You can supply an error code and it will pull translated messages, or provide messageIds directly for each component
export default (props: TestErrorProps) => {

  return (
    <ErrorSummary
      aria-labelledby="error-summary-title"
      role="alert"
      tabIndex={-1}>
      <ErrorSummary.Title id="error-summary-title">
        <FormattedMessage id={props.titleId || `error.codes.${props.code}.title`}/>
      </ErrorSummary.Title>
      <ErrorSummary.Body>
        <p>
          <FormattedMessage id={props.bodyId || `error.codes.${props.code}.body`}/>
        </p>
        <ErrorSummary.List>
          {props.fixId && (
            <ErrorSummary.Item>
              <FormattedMessage id={props.bodyId} />
            </ErrorSummary.Item>
          )}
          {flatten(enMsgs)[`error.codes.${props.code}.fix`] && (
            <ErrorSummary.Item>
              <FormattedMessage id={`error.codes.${props.code}.fix`} />
            </ErrorSummary.Item>             
          )}
        </ErrorSummary.List>
      </ErrorSummary.Body>
    </ErrorSummary>);
};

