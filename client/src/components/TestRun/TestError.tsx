import React from 'react';
import { ErrorSummary } from 'nhsuk-react-components';

interface TestErrorProps {
  title?: string;
  body?: string;
  items?: string[];
}

// NOTE: This component should be passed localised strings
// Ensure you do your localisation in the parent component via useFormatMessage

export default (props: TestErrorProps) => {

  return (
    <ErrorSummary
      aria-labelledby="error-summary-title"
      role="alert"
      tabIndex={-1}>
      <ErrorSummary.Title id="error-summary-title">{props.title}</ErrorSummary.Title>
      <ErrorSummary.Body>
        <p>{props.body}</p>
        <ErrorSummary.List>
          {props.items?.map(i => (
            <ErrorSummary.Item key={i}>
              {i}
            </ErrorSummary.Item>            
          ))}
        </ErrorSummary.List>
      </ErrorSummary.Body>
    </ErrorSummary>);
};

