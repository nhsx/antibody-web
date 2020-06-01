import React from 'react';
import { Row, Col } from "nhsuk-react-components";
import { ContinueButton } from "components/ui/Buttons";
import { START_STEP } from 'abt-lib/dist/models/Steps';

export default () => {
  return (
    <Row>
      <Col width="full">
        You have {Math.random() > 0.5 ? "not" : ""} had COVID19.
        <ContinueButton
          text="Start Again"
          href={`/test/${START_STEP}`}
        />
      </Col>
    </Row>
  );
};
