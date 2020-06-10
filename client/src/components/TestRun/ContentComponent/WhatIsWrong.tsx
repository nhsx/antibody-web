import React from 'react';
import { Row, Col } from 'nhsuk-react-components';
import { ContinueButton, SecondaryButton } from 'components/ui/Buttons';
import { StepProps } from './Step';
import Heading from 'components/ui/Heading';

export default (props: StepProps) => {
  
  return <Row>
    <Col width="full">
      <Heading>What Is Wrong?</Heading>
      <div>
        <SecondaryButton
          href="/test/checkYourKit"
        />
      </div>
      <div>
        <ContinueButton
          href="/test/missing"
          text="Missing Pieces"
        />      
      </div>
      <div>
        <ContinueButton
          href="/test/damaged"
          text="Damaged Pieces"
        />
      </div>
    </Col>
  </Row>;
};
