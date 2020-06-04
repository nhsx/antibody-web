import React from "react";
import Asset from "../../ui/Asset";
import { Row, Col, Label } from "nhsuk-react-components";
import { ContinueButton } from "components/ui/Buttons";
import { StepProps } from "./Step";

export default (props: StepProps) => {
  return (
    <React.Fragment>
      <Label size="m">Set up test</Label>
      <Row>
        <Col width="full">
          <Asset
            src="kit.png"
            alt="Image of the test kit"
            width={201}
            height={203}
          />
          <ul className="nhsuk-list nhsuk-list--bullet">
            <li>It takes about 15 to 20 minutes to do the test</li>
            <li>Choose a well lit room</li>
            <li>Choose a flat clean dry surface</li>
            <li>Unwrap blood collection tube and test device</li>
            <li>Carefully twist and pull cap off lancet</li>
          </ul>
          <ContinueButton
            href={props.next}
          />
        </Col>
      </Row>
    </React.Fragment>

  );
};
