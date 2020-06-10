import React from "react";
import Asset from "../../ui/Asset";
import { Row, Col, Label, BodyText, Radios } from "nhsuk-react-components";
import { ContinueButton } from "components/ui/Buttons";
import { StepProps } from "./Step";

export default (props: StepProps) => {
  return (
    <React.Fragment>
      <Label size="m">What do you see?</Label>
      <Row>
        <Col width="full">
          <BodyText>Look at the center of the test device. Which image below most closely resembles your device?</BodyText>

          <Radios name="whatDoYouSee">
            <Radios.Radio>
              C line only
              <Asset
                src="c-only.png"
                alt="Image of test kit showing C line only"/>
            </Radios.Radio>
            <Radios.Radio>
              C and M line
              <Asset
                src="c-and-m.png"
                alt="Image of test kit showing C and M lines"/>
            </Radios.Radio>
            <Radios.Radio>
              C and G line
              <Asset
                src="c-and-g.png"
                alt="Image of test kit showing C and G lines"/>
            </Radios.Radio>
            <Radios.Radio>
              C, G and M line
              <Asset
                src="c-g-and-m.png"
                alt="Image of test kit showing C, G and M lines"/>
            </Radios.Radio>
            <Radios.Radio>
              No line
              <Asset
                src="no-line.png"
                alt="Image of test kit showing no line"/>
            </Radios.Radio>
          </Radios>
          
          
          <ContinueButton
            href={props.next}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};
