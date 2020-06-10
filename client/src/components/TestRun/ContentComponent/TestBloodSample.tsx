import React from "react";
import Asset from "../../ui/Asset";
import { Row, Col, Label } from "nhsuk-react-components";
import { ContinueButton } from "components/ui/Buttons";
import { StepProps } from "./Step";

export default (props: StepProps) => {
  return (
    <React.Fragment>
      <Label size="m">Test blood sample</Label>
      <Row>
        <Col width="full">
          <Asset
            src="test.png"
            alt="Image of the applying blood from pipette to test kit"
          />
          <ul className="nhsuk-list nhsuk-list--bullet">
            <li>Twist and remove cap off the small bottle</li>
            <li>Hold bottle just above hole on the test device</li>
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
