import React from 'react';
import { Row, Col } from 'nhsuk-react-components';
import { ContinueButton } from 'components/ui/Buttons';
import { StepProps } from './Step';
import Heading from 'components/ui/Heading';
import { FormattedMessage } from 'react-intl';

export default (props: StepProps) => {
  
  return <Row>
    <Col width="full">
      <Heading><FormattedMessage id="kit.reorder" /></Heading>
      <div>
        <ContinueButton
          href="/test"
          text="Order a test kit"
        />
      </div>
    </Col>
  </Row>;
};
