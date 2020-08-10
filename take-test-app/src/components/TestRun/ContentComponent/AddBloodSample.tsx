import React from "react";
import { Row, Col, Label, Images } from "nhsuk-react-components";
import { ContinueButton } from "components/ui/Buttons";
import { StepProps } from "./Step";

export default (props: StepProps) => {
  return (
    <Row>
      <Col width="two-thirds">
        <Label size="l">Step 3: Add blood sample to test device</Label>
        <Images
          srcSet="/assets/images/add-blood.png"
          alt="Image of a blood sample being added to the test device"
          caption="Image of a blood sample being added to the test device"
        />
        <ul className="nhsuk-list nhsuk-list--bullet">
          <li>Holding the blood collection tube straight, gently touch the centre of the sample hole with the tip of the tube</li>
          <li>Slowly and gently, squeeze the bulb to add all the blood into the hole.</li>
        </ul>
        <ContinueButton
          href={props.next}
        />
      </Col>
    </Row>
  );
};
