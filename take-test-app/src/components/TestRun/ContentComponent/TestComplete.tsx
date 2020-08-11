import React from "react";
import { Row, Col, Label, BodyText } from "nhsuk-react-components";
import { ContinueButton } from "components/ui/Buttons";
import { StepProps } from "./Step";

export default (props: StepProps) => {
  return (
    <Row>
      <Col width="two-thirds">
        <Label size="l">You're all done!</Label>
        <BodyText>Thanks for taking part in this national research study into coronavirus (COVID-19).</BodyText>
        <BodyText>Remember, your results will be emailed to you in 2 to 3 working days. We’ve sent you an email confirming this and thanking you for taking part.</BodyText>
        <Label size="m">Safely dispose of your test kit</Label>
        <BodyText>No part of the kit can be recycled. Put everything in the special bin bag that came with the kit. You can then safely put it in with your household rubbish.</BodyText>
        <Label size="m">Give us your feedback</Label>
        <BodyText><a href="#abc">Tell us about your home testing experience to help us improve the service</a> - this takes 2 minutes.</BodyText>
        <Label size="m">Protect yourself and others from the virus</Label>
        <BodyText><a href="#abc">Social distancing: what you need to do (NHS)</a></BodyText>
        <BodyText><a href="#abc">Advice for people at higher risk from the virus (NHS)</a></BodyText>
        <ContinueButton
          href={props.next}
        />
      </Col>
    </Row>
  );
};
