import React from "react";
import Asset from "../../ui/Asset";
import { Row, Col, BodyText, Label } from "nhsuk-react-components";
import { ContinueButton } from "components/ui/Buttons";
import { StepProps } from './Step';

export default (props: StepProps) => {
  return (
    <React.Fragment>
      <Label size="m">Wash and dry hands</Label>
      <Row>
        <Col width="full">
          <Asset
            src="wash-and-dry-your-hands.png"
            alt="Wash and dry your hands icon"
            width={201}
            height={201}
          />
          <ul className="nhsuk-list nhsuk-list--bullet">
            <li>Wash hands for 20 seconds using warm water and soap</li>
            <li>Do not apply hand cream or sanitiser</li>
            <li>Dry hands thoroughly</li>
          </ul>
          <BodyText>Never touch any part of the test kit with wet hands</BodyText>
          <ContinueButton
            href={props.next}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};
