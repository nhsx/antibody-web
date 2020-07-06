import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Label, BodyText, WarningCallout } from "nhsuk-react-components";
import TimedStep from '../TimedStep';
import { StepProps } from './Step';
import { ContinueButton } from 'components/ui/Buttons';
import useTestData from 'hooks/useTestData';
import { createNotificationSubscription } from 'utils/pushNotifications';

export default (props: StepProps) => {
  const [showInfo, setShowInfo] = useState(true);
  const [testRecord, updateTest] = useTestData();
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [ready, setStepReady] = useState<boolean>(false);
  const loadedStartTime = useRef(testRecord?.timerStartedAt);


  useEffect(() => {
    // If we are loading a timer that has already started
    if (loadedStartTime.current) {
      setStartTime(loadedStartTime.current);
      setShowInfo(false);
    }
  }, [loadedStartTime]);

  useEffect(() => {

    const saveTimerData = async () => {
      if (testRecord && !testRecord.timerStartedAt) {
        let notificationSubscription: PushSubscription | undefined;

        try {
          notificationSubscription = await createNotificationSubscription();
        } catch (e) {
          console.log(e);
        }

        updateTest({
          ...testRecord,
          timerStartedAt: startTime,
          notificationSubscription
        });
      }
    };

    saveTimerData();
  }, [showInfo, startTime, testRecord, updateTest]);


  const handleMinuteLeft = () => {
    setShowInfo(false);
  };

  return (
    <Row>
      <Col width="two-thirds">
        <Label size="l">Wait for your test to process</Label>
        <BodyText>The test is being processed. When the timer ends you can move on to the final step.</BodyText>
        <BodyText>In the final step, we will explain how to take a photo of your test device so we can analyse it and send you your result.</BodyText>
        <TimedStep
          duration={startTime + 600000 - Date.now()}
          setStepReady={setStepReady}
          notifications={[{ time: 60000, onNotify: handleMinuteLeft }]}
        />
        <WarningCallout label="Test result accuracy">
          <BodyText>Do not leave your test for more than 15 minutes. If you do this, your test result will be invalid and you will not be able to re-order and retake the test.</BodyText>
        </WarningCallout>
        {ready && <ContinueButton
          href={props.next}
        />}
      </Col>
    </Row>
  );
};
