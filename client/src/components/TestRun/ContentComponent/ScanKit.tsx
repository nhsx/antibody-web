import React from 'react';
import { Row, Col } from "nhsuk-react-components";
import PhotoUploaderPanel from "components/FileUploader/TestResultPhotoUploader";
import { ContinueButton } from 'components/ui/Buttons';
import { StepProps } from './Step';

export default (props: StepProps) => {

  return (
    <Row>
      <Col width="full">
        <PhotoUploaderPanel
          {...props}
          onFileUploadComplete={() => {console.log('file uploaded');}} />
      </Col>
      <ContinueButton
        href={props.next}
        size="large"
        type="submit"
      />
    </Row>
  );
};