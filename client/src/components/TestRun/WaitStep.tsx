// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import {
  FORMID,
  StepDetailComponentProp,
  getNextDefaultStep,
} from './TestRunConstants';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Divider from '../ui/Divider';
import TimedStep from './TimedStep';

// Renders the step with a ten minute timer while the solution reacts
// with the test strip.
export default (props: StepDetailComponentProp) => {
  const { setStepReady } = props;

  const [startTime ] = useState(Date.now());
  const history = useHistory();
  const { step } = useParams();
  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setStepReady && setStepReady(false);
      const next = getNextDefaultStep({
        currentStepName: step!,
      });
      history.push(`/testrunsteps/${props.testRunUID}/${next}`);
    },
    [step, history, setStepReady, props.testRunUID]
  );

  useEffect(() => {
    const getStartTime = async () => {
      // @TODO: handle hydrating start timer
    };

    getStartTime();
  });

  // TODO: Generic Error handler.
  if (!step) {
    return <div>Oops, something went wrong</div>;
  }

  // We show the timer.
  return (
    <>
      <Divider />
      <TimedStep
        description="The test strip will take ten minutes to react with the test solution."
        duration={startTime + 600000 - Date.now()}
        // testRunUID={testRunUID}
        setStepReady={setStepReady}
      />
      <form
        style={{ display: 'none' }}
        id={FORMID}
        onSubmit={onSubmit} />
    </>
  );
};
