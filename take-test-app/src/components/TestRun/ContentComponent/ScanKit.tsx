import React, { useCallback } from 'react';
import { Row, Col } from "nhsuk-react-components";
import { StepProps } from './Step';
import TestResultPhotoUploader from 'components/FileUploader/TestResultPhotoUploader';
import { useHistory } from 'react-router-dom';

export default (props: StepProps) => {
  const history = useHistory();

  const handleGoToResults = useCallback(() => {
    history.push(props.next as string);
  }, [history, props.next]);
  
  return (
    <Row>
      <Col width="two-thirds">
        <TestResultPhotoUploader
          onInterpret={handleGoToResults} />
      </Col>
    </Row>
  );
};
