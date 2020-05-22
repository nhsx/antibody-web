import React from 'react';
import { Row, Col } from "nhsuk-react-components";
import PhotoUploaderPanel from "components/FileUploader/TestResultPhotoUploader";

export default (props) => {



  return (
    <Row>
      <Col width="full">
        <PhotoUploaderPanel
          {...props}
          onFileUploadComplete={() => {console.log('file uploaded');}} />
      </Col>
    </Row>
  );
};