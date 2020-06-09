import React from "react";
import Asset from "../../ui/Asset";
import { Row, Col, Label } from "nhsuk-react-components";
import { ContinueButton } from "components/ui/Buttons";
import { StepProps } from "./Step";

export default (props: StepProps) => {
  return (
    <React.Fragment>
      <Label size="m">Cover cut on finger</Label>
      <Row>
        <Col width="full">
          <Asset
            src="cover.png"
            alt="Image of applying plaster to finger"
          />
          <ul className="nhsuk-list nhsuk-list--bullet">
            <li>Apply pressure to cut using dry clean tissue</li>
            <li>Apply plaster (or alternative)</li>
            <li>Your hands must be dry before you continue</li>
          </ul>
          <ContinueButton
            href={props.next}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};
