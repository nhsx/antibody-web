import React from 'react';
import { Row, Col, BodyText, Images, Label, InsetText } from 'nhsuk-react-components';
import { ContinueButton } from 'components/ui/Buttons';
import { StepProps } from './Step';

export default (props: StepProps) => {
  return (
    <Row>
      <Col width="two-thirds">
        <Label size="l">Check your test kit</Label>
        <BodyText>Your test kit should contain the following items. It is important to familiarise yourself with them before you begin.</BodyText>
        <Images
          srcSet="/assets/images/kit-laid-out.png"
          alt="Illustration showing the contents of your test kit"
          caption="Illustration showing the contents of your test kit"
        />
        <ul className="nhsuk-list nhsuk-list--bullet">
          <li>2x finger prick tools (called a lancet)</li>
          <li>1x blood collection tube (called a pipette)</li>
          <li>1x bottle of testing solution</li>
          <li>1x test device</li>
          <li>1x special bin bag</li>
        </ul>
        <InsetText>Handle each item carefully and do not use them until instructed to do so. <a href="#abc">You can call 119 to get support if a kit is missing or damaged</a>.</InsetText>
        <BodyText>Before you begin your test:</BodyText>
        <ul className="nhsuk-list nhsuk-list--bullet">
          <li>Make some space on a clean dry table in a well lit room</li>
          <li>Open your test kit and lay each item out in front of you</li>
          <li>Take the test device out of its foil wrapper so it is ready for when you need it</li>
        </ul>
        <ContinueButton href={props.next} />
      </Col>
    </Row>
  );
};
