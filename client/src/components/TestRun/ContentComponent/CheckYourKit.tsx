import React from 'react';
import { Row, Col, BodyText, Images, Label, InsetText } from 'nhsuk-react-components';
import { ContinueButton } from 'components/ui/Buttons';
import { StepProps } from './Step';
import { Link } from 'react-router-dom';

export default (props: StepProps) => {
  
  return <Row>
    <Col width="full">
      <Label size="m">Check Your Kit</Label>
      <BodyText>Take out the items in your test kit</BodyText>
      <BodyText>Do not unwrap or open them</BodyText>
      <BodyText>Do not squeeze or bend them - handle gently</BodyText>
      <Images
        srcSet="/assets/images/check-your-test-kit/lancet.png 325w"
        alt="Image of the lancet"
        caption="Lancet (finger prick tool)"
      />
      <Images
        srcSet="/assets/images/check-your-test-kit/small-bottle.png 325w"
        alt="Image of the small bottle"
        caption="Small bottle"
      />
      <Images
        srcSet="/assets/images/check-your-test-kit/pipette.png 325w"
        alt="Image of the pipette"
        caption="Pipette"
      />
      <Images
        srcSet="/assets/images/check-your-test-kit/test-device.png 325w"
        alt="Image of the test device"
        caption="Test device"
      />
      <Images
        srcSet="/assets/images/check-your-test-kit/disposal-bag.png 325w"
        alt="Image of the bag to dispose the kit"
        caption="Special bag to dispose of the kit"
      />
      <BodyText>
        You will need: 2 clean tissues and 1 plaster (or alternative). These are not supplied.
      </BodyText>
      <InsetText>If something is missing or damaged
        <Link
          to="/test/whatIsWrong"
        > order a replacement kit</Link>
      </InsetText>
      <ContinueButton
        text="Begin Test"
        href={props.next}
      />
    </Col>
  </Row>;
};
