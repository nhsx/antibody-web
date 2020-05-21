// Copyright (c) 2020 by Audere
//
// Use of this source code is governed by an LGPL-3.0 license that
// can be found in the LICENSE file distributed with this file.
import { StepDetails, TESTRUN_STEPS } from './TestRunConstants';
import { Label, Row, Col } from 'nhsuk-react-components';
import React from 'react';


interface TestRunHeaderProps {
  step: string;
  stepDetails: StepDetails;
}

export default (props: TestRunHeaderProps) => {
  const { step, stepDetails } = props;

  // Find how many steps are we away from the start
  // TODO: Add this progress counter back in
  let marker = TESTRUN_STEPS[step];
  while (marker.nav.previous) {
    marker = TESTRUN_STEPS[marker.nav.previous];
  }

  // Find how many steps there is in total.
  // We do this because steps can be skipped.
  marker = TESTRUN_STEPS[step];
  while (marker.nav.next) {
    marker = TESTRUN_STEPS[marker.nav.next.default];
  }

  return (
    <Row>
      <Col width="full">
        {stepDetails.LeadingAsset && (
          <div>
            <stepDetails.LeadingAsset />
          </div>
        )}
        {stepDetails.title && (
          <Label size="m">
            {props.stepDetails.title}
          </Label>
        )}
      </Col>
    </Row>
  );
};
