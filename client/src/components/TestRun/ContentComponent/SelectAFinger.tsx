import React from "react";
import Asset from "../../ui/Asset";
import { Row, Col, Details, BodyText } from "nhsuk-react-components";
import { StepProps } from './Step';
import { ContinueButton } from "components/ui/Buttons";

export default (props: StepProps) => {

  return (
    <Row>
      <Col width="full">
        <Asset
          src="select-a-finger.png"
          alt="Image showing arrows pointing to the middle and ring finger"
          width={325}
          height={201}
        />
        <ul className="nhsuk-list nhsuk-list--bullet">
          <li>Choose a finger on the hand you do not write with</li>
          <li>
          The 3rd or 4th (middle or ring) finger are usually less sensitive
          </li>
          <li>
          Get blood flowing into finger - hold hand below waist and gently
          squeeze along finger from knuckle to tip for 10 seconds
          </li>
        </ul>
        <Details>
          <Details.Summary>
          If you’ve had a mastectomy (breast removal)
          </Details.Summary>
          <Details.Text>
            <BodyText>
            You must not prick a finger on the same side of your body as the
            operation. If you’re worried, speak to your doctor.
            </BodyText>
          </Details.Text>
        </Details>
      <ContinueButton
        href={props.next}
      />
      </Col>
    </Row>
  );
};
