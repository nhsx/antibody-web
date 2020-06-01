import React from 'react';
import { Row, Col } from "nhsuk-react-components";
import { ContinueButton } from 'components/ui/Buttons';
import { StepProps } from './Step';
import TestResultPhotoUploader from 'components/FileUploader/TestResultPhotoUploader';

export default (props: StepProps) => {

  return (
    <Row>
      <Col width="full">
        <TestResultPhotoUploader />
        <ContinueButton
          href={props.next}
        />
      </Col>
    </Row>
  );
};