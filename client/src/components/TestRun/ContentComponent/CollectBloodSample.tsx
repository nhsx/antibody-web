import React from "react";
import Asset from "../../ui/Asset";
import { Row, Col, Label, BodyText } from "nhsuk-react-components";
import { ContinueButton } from "components/ui/Buttons";
import { StepProps } from "./Step";

export default (props: StepProps) => {
  return (
    <React.Fragment>
      <Label size="m">Collect blood sample</Label>
      <Row>
        <Col width="full">
          <Asset
            src="collect.png"
            alt="Image of collecting blood sample with pipette"
          />
          <BodyText>When collecting blood, do not squeeze the collection tube or push it into the cut on your finger.</BodyText>
          <ul className="nhsuk-list nhsuk-list--bullet">
            <li>Hold the blood collection tube horizontally</li>
            <li>Gently touch the blood drop with the tip of the tube (it will fill by itself)</li>
            <li>When filled to the black line, lift tube off finger</li>
            <li>If tube not filling, lift it off the finger and touch the blood drop again</li>
          </ul>
          <ContinueButton
            href={props.next}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};
