// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React, { useCallback, useEffect, useState } from 'react';
import Timer from 'components/ui/Timer';

export interface InterfaceTimedStepProps {
  duration: number;
  //testRunUID: string;
  setStepReady: (ready: boolean) => void;
}

export default (props: InterfaceTimedStepProps) => {
  const { duration, setStepReady } = props;

  // Time is complete, enable the "next" button.
  const timerCompleteCallback = useCallback(() => {
    setStepReady && setStepReady(true);
  }, [setStepReady]);


  // store the timer start time, will be updated via fastforward click.
  const [startTimeInternal, setStartTimeInternal] = useState<number>(
    Date.now()
  );

  // Time when the step was first accessed.
  const [registeredStartTime] = useState(Date.now());
  // Set the starttime once the value is loaded.
  useEffect(() => {
    if (registeredStartTime !== undefined) {
      setStartTimeInternal(registeredStartTime);
    }
  }, [registeredStartTime]);

  const onClickWrapper = useCallback(() => {
    if (startTimeInternal === null) {
      return;
    }
    const now = Date.now();
    if (duration - (now - startTimeInternal) > 5000) {
      setStartTimeInternal(now - duration + 5000);
    }
  }, [startTimeInternal, duration]);

  return (
    <div onClick={onClickWrapper}>
      <Timer
        duration={duration}
        startTime={startTimeInternal!}
        onTimerComplete={timerCompleteCallback}
      />
    </div>
  );
};
