import React, { useEffect, useState } from 'react';
import { Row, Col } from "nhsuk-react-components";
import TimedStep from '../TimedStep';
import { withApp } from 'components/App/context';
import { StepDetailComponentProp } from '../TestRunConstants';

const Wait = (props: StepDetailComponentProp) => {
  const { setStepReady } = props;
  const [startTime ] = useState(Date.now());

  useEffect(() => {
    //@TODO: Save start time to user record if not already there, else pull it out
  },[]);

  return (
    <Row>
      <Col width="full">
        <TimedStep
          description="The test strip will take ten minutes to react with the test solution."
          duration={startTime + 600000 - Date.now()}
          // testRunUID={testRunUID}
          setStepReady={setStepReady}
        />
      </Col>
    </Row>
  
  );
};

export default withApp(Wait);