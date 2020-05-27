import React from "react";
import Asset from "../../ui/Asset";
import { Row, Col } from "nhsuk-react-components";
import { ContinueButton } from "components/ui/Buttons";
import { StepProps } from './Step';

export default (props: StepProps) => {
  return (
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
          <li>Dry hands thoroughly</li>
          <li>Do not apply hand cream or sanitiser</li>
        </ul>
      </Col>
      <ContinueButton
        href={props.next}
        size="large"
        type="submit"
      />
    </Row>
  );
};
