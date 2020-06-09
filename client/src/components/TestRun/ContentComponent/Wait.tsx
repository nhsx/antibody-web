import React, { useEffect, useState } from 'react';
import { Row, Col, Label, BodyText, Button } from "nhsuk-react-components";
import TimedStep from '../TimedStep';
import { StepProps } from './Step';
import { ContinueButton } from 'components/ui/Buttons';
import useTestData from 'hooks/useTestData';



export default (props: StepProps) => {
  const [showInfo, setShowInfo] = useState(true);
  const [testRecord, updateTest] = useTestData();
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [ready, setStepReady] = useState<boolean>(false);

  useEffect(() => {
    if (testRecord && !testRecord.timerStartedAt) {
      updateTest({
        ...testRecord,
        timerStartedAt: startTime
      });
    } else if (testRecord) {
      setShowInfo(false);
      setStartTime(testRecord.timerStartedAt);
    }
  }, [testRecord, startTime, updateTest]);

  return (
    <>
      <Label size="m">Test Processing</Label>
      <Row>
        <Col width="full">
        
          {(showInfo && !ready) ? (
            <>
              <BodyText>Leave the device flat on an even surface. It needs to be there for 10 minutes. We will let you know when your results are ready.</BodyText>
              <Button onClick={() => setShowInfo(false)}>Continue</Button>
            </>
          ) : (
            <TimedStep
              description="The test strip will take ten minutes to react with the test solution."
              duration={startTime + 600000 - Date.now()}
              setStepReady={setStepReady}
            />
          )}
          {ready && <ContinueButton
            href={props.next}
          />}
        </Col>
      </Row>
    </>
  );
};
