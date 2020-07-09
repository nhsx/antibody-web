import React from "react";
import { Row, Col, Label, Images } from "nhsuk-react-components";
import { ContinueButton } from "components/ui/Buttons";
import { StepProps } from "./Step";

export default (props: StepProps) => {
  return (
    <Row>
      <Col width="two-thirds">
        <Label size="l">Step 2: Draw blood</Label>
        <Images
          srcSet="/assets/images/draw-blood.png"
          alt="Image of a blood sample being drawn"
          caption="Image of a blood sample being drawn"
        />
        <ul className="nhsuk-list nhsuk-list--bullet">
          <li>Do not squeeze the blood collection tube or push it into the cut on your finger.</li>
          <li>Holding the tube horizontally, gently touch the blood drop with the tip of the tube.</li>
          <li>The blood will automatically flow up the tube.</li>
          <li>Fill only to the black line.</li>
          <li>If the tube does not fill to the black line, lift it off the finger and touch the blood drop again.</li>
        </ul>
        <ContinueButton
          href={props.next}
        />
      </Col>
    </Row>
  );
};
