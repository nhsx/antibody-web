import React from "react";
import { Row, Col, Label, BodyText, DoDontList, WarningCallout } from "nhsuk-react-components";
import { ContinueButton } from "components/ui/Buttons";
import { StepProps } from "./Step";

export default (props: StepProps) => {
  return (
    <Row>
      <Col width="two-thirds">
        <Label size="l">Get ready to take your test</Label>
        <BodyText>Before taking the test:</BodyText>
        <DoDontList listType="do">
          <DoDontList.Item> make sure you're hydrated </DoDontList.Item>
          <DoDontList.Item> make sure your hands are clean - wash them in warm soapy water for 20 seconds </DoDontList.Item>
          <DoDontList.Item> make sure your hands are warm </DoDontList.Item>
          <DoDontList.Item> make sure your hands are dry </DoDontList.Item>
          <DoDontList.Item> make sure you are not wearing hand cream or hand sanitiser </DoDontList.Item>
        </DoDontList>
        <DoDontList listType="dont">
          <DoDontList.Item>remove the test device from its foil wrapper until you’re ready to take the test</DoDontList.Item>
          <DoDontList.Item>use the lancet until you’re ready to take the test (lancets can only be used once)</DoDontList.Item>
          <DoDontList.Item>take blood from fingers on the side of your body affected by a mastectomy</DoDontList.Item>
          <DoDontList.Item>take blood from the same place more than once, this can lead to an infection</DoDontList.Item>
        </DoDontList>
        <WarningCallout label="Safety warning">
          <BodyText>Remember:</BodyText>
          <ul className="nhsuk-list nhsuk-list--bullet">
            <li>keep the test out of reach of children and pets</li>
            <li>if any material is swallowed seek medical advice immediately</li>
            <li>no one under the age of 8 takes the test</li>
            <li>the test is not suitable for anyone under the age of 8</li>
            <li>children aged 8 to 16 should not take the test without adult supervision</li>
          </ul>
        </WarningCallout>
        <ContinueButton
          href={props.next}
        />
      </Col>
    </Row>

  );
};
