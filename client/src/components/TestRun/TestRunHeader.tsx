// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import { StepDetails, TESTRUN_STEPS } from './TestRunConstants';
import { Theme, createStyles, makeStyles } from '@material-ui/core';

import Progress from 'components/ui/Progress';
import React from 'react';
import { cx } from 'style/utils';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    leadingAsset: {
      textAlign: 'center',
      marginBottom: '.5rem',
    },
    headerRoot: {
      marginBottom: '1rem',
    },
  })
);

interface TestRunHeaderProps {
  step: string;
  stepDetails: StepDetails;
}

export default (props: TestRunHeaderProps) => {
  const classes = useStyle();
  const { step, stepDetails } = props;

  // Find how many steps are we away from the start
  let stepCount = 1;
  let marker = TESTRUN_STEPS[step];
  while (marker.nav.previous) {
    stepCount++;
    marker = TESTRUN_STEPS[marker.nav.previous];
  }

  // Find how many steps there is in total.
  // We do this because steps can be skipped.
  let totalSteps = stepCount;
  marker = TESTRUN_STEPS[step];
  while (marker.nav.next) {
    totalSteps++;
    marker = TESTRUN_STEPS[marker.nav.next.default];
  }

  return (
    <div className={cx(['container', classes.headerRoot])}>
      <Progress value={stepCount} max={totalSteps} />
      {stepDetails.LeadingAsset && (
        <div className={classes.leadingAsset}>
          <stepDetails.LeadingAsset />
        </div>
      )}
      {stepDetails.title && (
        <h1 className="title">{props.stepDetails.title}</h1>
      )}
    </div>
  );
};
