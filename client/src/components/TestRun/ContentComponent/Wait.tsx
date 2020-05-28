import React, { useEffect, useState } from 'react';
import { Row, Col } from "nhsuk-react-components";
import TimedStep from '../TimedStep';
import { StepProps } from './Step';
import { ContinueButton } from 'components/ui/Buttons';

export default (props: StepProps) => {
  
  const [startTime ] = useState(Date.now());
  const [ready, setStepReady ] = useState<boolean>(false);

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
      {ready && <ContinueButton
        
        href={props.next}
        size="large"
        type="submit"
      />}
    </Row>
  );
};
