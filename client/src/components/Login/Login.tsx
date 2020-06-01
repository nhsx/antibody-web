import React, { useState, SyntheticEvent } from "react";
import { Row, Col, Form, Input, Button, Container } from "nhsuk-react-components";

interface LoginProps {
  formSubmit: Function;
}

export default (props: LoginProps) => {
  const { formSubmit } = props;
  const [signInId, setSignInId] = useState<string>("");

  const onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    formSubmit(signInId);
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <Container>
        <Row>
          <Col width="one-half">
            <Input
              id="sign-in-id"
              name="sign-in-id"
              label="Sign In ID"
              onChange={(e) => setSignInId(e.currentTarget.value)}
            />
          </Col>
        </Row>
      </Container>
      <br />
      <Container>
        <Row>
          <Col width="full">
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
