import React from 'react';
import { Row, Col } from "nhsuk-react-components";
import { ContinueButton } from "components/ui/Buttons";
import { START_STEP } from 'abt-lib/dist/models/Steps';
import useTestData from 'hooks/useTestData';

export default () => {
  const [testRecord] = useTestData();

  return (
    <Row>
      <Col width="full">
        <Row>
        You have tested {testRecord?.result} for Covid19
        </Row>
        <Row>
          <ContinueButton
            text="Start Again"
            href={`/test/${START_STEP}`}
          />
        </Row>
      </Col>
    </Row>
  );
};
