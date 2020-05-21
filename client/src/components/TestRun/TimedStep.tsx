// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import React, { useCallback, useEffect, useState } from 'react';
import {  createStyles, makeStyles } from '@material-ui/core';
import Loader from 'components/ui/Loader';
import { TESTRUN_STEPS } from './TestRunConstants';
import Timer from 'components/ui/Timer';
import { useParams } from 'react-router-dom';

const useStyle = makeStyles(() =>
  createStyles({
    timedStepContent: {
      maxWidth: `300px`,
      margin: 'auto',
      display: 'block',
    },

    timedStepTimer: {
      marginTop: '1rem',
    },
  })
);

export interface InterfaceTimedStepProps {
  duration: number;
  //testRunUID: string;
  setStepReady: (ready: boolean) => void;
  description: string;
}

export default (props: InterfaceTimedStepProps) => {
  const { duration, setStepReady, description } = props;

  const { step } = useParams();

  const classes = useStyle();

  // Time is complete, enable the "next" button.
  const timerCompleteCallback = useCallback(() => {
    setStepReady && setStepReady(true);
  }, [setStepReady]);

  // Fetch when the timer started.
  const [testRunDetail, loading, error] = [{ steps: {} }, false, null];
  // @TODO : Fetch our test state from wherever we're storing it

  // store the timer start time, will be updated via fastforward click.
  const [startTimeInternal, setStartTimeInternal] = useState<number | null>(
    null
  );

  const stepName = TESTRUN_STEPS[step!].name;

  // Time when the step was first accessed.
  const registeredStartTime = step
    ? testRunDetail?.steps[stepName]?.firstVisitedTime
    : undefined; // not loaded yet

  // Set the starttime once the value is loaded.
  useEffect(() => {
    if (loading || error) {
      return;
    }
    if (registeredStartTime !== undefined) {
      setStartTimeInternal(registeredStartTime);
    }
  }, [registeredStartTime, loading, error]);

  // fast forward on click.
  const onClickWrapper = useCallback(() => {
    if (loading || startTimeInternal === null) {
      return;
    }
    const now = Date.now();
    if (duration - (now - startTimeInternal) > 5000) {
      setStartTimeInternal(now - duration + 5000);
    }
  }, [startTimeInternal, duration, loading]);

  if (error) {
    // TODO: Generic error handler.
    return <div>Something went wrong</div>;
  }

  const showLoader = loading || startTimeInternal === null;

  return (
    <div onClick={onClickWrapper}>
      {description && <div>{props.description}</div>}
      <div className={classes.timedStepContent}>
        {showLoader && <Loader />}
        {!showLoader && (
          <div className={classes.timedStepTimer}>
            <Timer
              duration={duration}
              startTime={startTimeInternal!}
              onTimerComplete={timerCompleteCallback}
            />
          </div>
        )}
      </div>
    </div>
  );
};
