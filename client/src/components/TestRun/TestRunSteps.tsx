// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import '../../style/sassStyle';

import { FORMID, TESTRUN_STEPS, getNextDefaultStep } from './TestRunConstants';
import { Link, useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core';
import { ContinueButton } from 'components/ui/Buttons';
import PageContent from '../ui/PageContent';
import TestRunHeader from './TestRunHeader';

const test = 't';

const testRunStepStyle = makeStyles((theme: Theme) =>
  createStyles({
    testRunButtons: {
      minWidth: '185px',
    },

    stepContent: {
      marginBottom: '1.5rem',
    },
  })
);

/**
 * Test Kit Tutorial.
 * Each step might be just static information or contain form
 * preventing going to the next step until it is completed.
 */
export default () => {
  // id: user id, step: step number in the tutorial
  const { testRunUID, step } = useParams() as {
    testRunUID: string;
    step: string;
  };

  const style = testRunStepStyle();

  // This will be used if the step contains a form.
  const [nextButtonEnabled, setNextButtonEnabled] = useState(false);

  // Cache this callback to avoid rerenders of the content.
  const setStepReady = useCallback((formReady: boolean) => {
    setNextButtonEnabled(formReady);
  }, []);

  // Resets the state when clicking on Next as a Link
  const onClickNextLink = useCallback(() => {
    setNextButtonEnabled(false);
  }, []);

  // Updating the current test run step and timestamp info.
  useEffect(() => {
    async function updateTestRunInfo() {
      //@TODO: Implement test stage persistence
    }
    updateTestRunInfo();
  }, [testRunUID, step]);

  const currentStepDescription = TESTRUN_STEPS[step];

  const nextIsDisabled =
    (currentStepDescription.hasFormContent ||
      currentStepDescription.isBlockingStep) &&
    !nextButtonEnabled;

  const nextDefaultStep = getNextDefaultStep({
    currentStepName: step,
  });

  let nextButton = null;
  const nextPath = nextDefaultStep
    ? `/testrunsteps/${testRunUID}/${nextDefaultStep}`
    : undefined;

  if (nextDefaultStep !== undefined && nextPath !== undefined) {
    // The next button will get disabled if the current step
    // contains a form.
    nextButton = (
      <ContinueButton
        text={currentStepDescription.nav.next ? 'Next' : 'View Results'}
        className={style.testRunButtons}
        disabled={nextIsDisabled}
        form={FORMID}
        size="large"
        type="submit"
      />
    );

    if (!(currentStepDescription.hasFormContent || nextIsDisabled)) {
      nextButton = (
        <Link to={nextPath} onClick={onClickNextLink}>
          {nextButton}
        </Link>
      );
    }
  }

  return (
    <PageContent>
      <TestRunHeader stepDetails={currentStepDescription} step={step} />
      <div className={'container'}>
        <div className={style.stepContent}>
          <currentStepDescription.ContentComponent
            setStepReady={setStepReady}
            submitUrl={nextPath}
            testRunUID={testRunUID!}
          />
        </div>
        {nextButton}
      </div>
    </PageContent>
  );
};
