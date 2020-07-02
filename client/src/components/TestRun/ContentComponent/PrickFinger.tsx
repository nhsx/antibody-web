import React from "react";
import { Row, Col, Label, Images } from "nhsuk-react-components";
import { ContinueButton } from "components/ui/Buttons";
import { StepProps } from "./Step";

export default (props: StepProps) => {
  return (
    <Row>
      <Col width="full">
        <Label size="l"><span data-testid="page-title">Prick finger</span></Label>
        <Images
          srcSet="/assets/images/prick.png 325w"
          alt="Image of a lancet pricking a finger"
          caption="Image of a lancet pricking a finger"
        />
        <ul className="nhsuk-list nhsuk-list--bullet">
          <li>Remove cap from lancet</li>
          <li>Do not squeeze the sides of the lancet</li>
          <li>Select your 3rd or 4th finger (middle or ring) on the hand you don’t write with</li>
          <li>Place the lancet just off the centre of the fingertip and press firmly for 2 to 3 seconds until it clicks</li>
          <li>If a blood drop does not form after a few seconds, gently squeeze the finger</li>
        </ul>
        <ContinueButton
          href={props.next}
        />
      </Col>
    </Row>
  );
};
