import React from "react";
import { Row, Col, Label, Images } from "nhsuk-react-components";
import { ContinueButton } from "components/ui/Buttons";
import { StepProps } from "./Step";

export default (props: StepProps) => {
  return (
    <Row>
      <Col width="two-thirds">
        <Label size="l">Add test solution to test device</Label>
        <Images
          srcSet="/assets/images/collect.png 325w"
          alt="Image of a blood sample being added to the test device"
          caption="Image of a blood sample being added to the test device"
        />
        <ul className="nhsuk-list nhsuk-list--bullet">
          <li>Twist and remove cap off test solution bottle</li>
          <li>Add the test solution to the sample hole one drop at a time, until the bottle is empty</li>
        </ul>
        <ContinueButton
          href={props.next}
          text="Start timer"
        />
      </Col>
    </Row>
  );
};
