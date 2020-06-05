import React from "react";
import Asset from "../../ui/Asset";
import { Row, Col, Label } from "nhsuk-react-components";
import { ContinueButton } from "components/ui/Buttons";
import { StepProps } from "./Step";

export default (props: StepProps) => {
  return (
    <React.Fragment>
      <Label size="m">Prick finger</Label>
      <Row>
        <Col width="full">
          <Asset
            src="kit.png"
            alt="Image of the test kit"
            width={201}
            height={203}
          />
          <ul className="nhsuk-list nhsuk-list--bullet">
            <li>Stand up (if you can)</li>
            <li>Lay hand on flat surface, palm up</li>
            <li>Position lancet on finger (as shown)</li>
            <li>Press lancet firmly for 2 to 3 seconds then remove</li>
            <li>A tiny blood drop will form (if it doesn't, gently and slowly squeeze sides of finger)</li>
          </ul>
          <ContinueButton
            href={props.next}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};
