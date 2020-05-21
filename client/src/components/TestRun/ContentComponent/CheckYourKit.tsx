import React from 'react';
import { Row, Col, BodyText, Images } from 'nhsuk-react-components';

export default () => (
  <Row>
    <Col width="full">
      <BodyText>Your test kit should include:</BodyText>
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
        Keep them wrapped and do not squeeze or bend them - handle gently
      </BodyText>
      <BodyText>Not supplied but needed: plaster/tissue</BodyText>
    </Col>
  </Row>
);
