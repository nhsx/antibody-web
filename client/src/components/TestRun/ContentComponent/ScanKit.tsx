import React from 'react';
import { Row, Col } from "nhsuk-react-components";
import { ContinueButton } from 'components/ui/Buttons';
import { StepProps } from './Step';
import TestResultPhotoUploader from 'components/FileUploader/TestResultPhotoUploader';

export default (props: StepProps) => {
  const [ready, setReady] = React.useState(false);

  return (
    <Row>
      <Col width="full">
        <TestResultPhotoUploader onFileUploadComplete={setReady} />
        {ready && <ContinueButton href={props.next} />}
      </Col>
    </Row>
  );
};
