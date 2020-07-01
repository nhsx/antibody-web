import React from "react";
import { Row, Col, Label, Form, Input, Hint } from "nhsuk-react-components";
import { ContinueButton } from "components/ui/Buttons";
import { StepProps } from "./Step";

export default (props: StepProps) => {
  return (
    <Row>
      <Col width="two-thirds">
        <Label size="l">Enter your test kit ID</Label>
        <Form onSubmit={() => console.log("Submitted")}>
          <Hint>The ID is printed on your test kit box. It looks like this: LOT ABC-19YY-1234. It always starts with "LOT"</Hint>
          <Row>
            <Col width="two-thirds">
              <Input
                data-testid="login-input"
                id="sign-in-id"
                name="sign-in-id"
                onChange={(e) => console.log(e.currentTarget.value)}
              />
            </Col>
          </Row>
          <ContinueButton
            href={props.next}
          />
        </Form>
      </Col>
    </Row>
  );
};
