import React from 'react';
import { Row, Col, Checkboxes } from 'nhsuk-react-components';
import { ContinueButton, SecondaryButton } from 'components/ui/Buttons';
import { StepProps } from './Step';
import Heading from 'components/ui/Heading';
import { FormattedMessage } from 'react-intl';

export interface ReportProps extends StepProps {
  type: string
}

const options = [
  'lancet', 'testDevice', 'pipette', 'smallBottle', 'biohazardWasteBag'
];


export default (props: ReportProps) => {

  // @TODO: Persist this data to the backend
  
  return <Row>
    <Col width="full">
      <Heading><FormattedMessage id={`kit.whatIs${props.type}`} /></Heading>
      <Checkboxes name="broken">
        {options.map(o => (
          <Checkboxes.Box value={o}><FormattedMessage id={`kit.${o}`} /></Checkboxes.Box>
        ))}
      </Checkboxes>
      <div>
        <SecondaryButton
          href="/test/checkYourKit"
        />
      </div>
      <div>
        <ContinueButton
          href="/test/missing"
          text="Submit"
        />
      </div>
    </Col>
  </Row>;
};
