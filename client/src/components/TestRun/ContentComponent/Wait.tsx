import React, { useEffect, useState } from 'react';
import { Row, Col } from "nhsuk-react-components";
import TimedStep from '../TimedStep';
import { StepProps } from './Step';
import { ContinueButton } from 'components/ui/Buttons';
import useTestData from 'hooks/useTestData';

export default (props: StepProps) => {
  
  const [testRecord, updateTest ] = useTestData(); 
  const [startTime, setStartTime ] = useState<number>(Date.now());
  const [ready, setStepReady ] = useState<boolean>(false);

  useEffect(() => {
    if (testRecord && !testRecord.timerStartedAt) {
      updateTest({
        ...testRecord,
        timerStartedAt: startTime
      });
    } else if (testRecord) {
      setStartTime(testRecord.timerStartedAt);
    }
  },[testRecord]);

  return (
    <Row>
      <Col width="full">
        <TimedStep
          description="The test strip will take ten minutes to react with the test solution."
          duration={startTime + 600000 - Date.now()}
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
