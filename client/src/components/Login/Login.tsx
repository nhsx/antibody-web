import React, { useState, SyntheticEvent } from "react";
import { Row, Col, Form, Input, Button } from "nhsuk-react-components";

export default ({ formSubmit }) => {
  const [signInId, setSignInId] = useState<string>("");
  const onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    formSubmit(signInId);
  };

  return (
    <Row>
      <Col width="full">
        <Form onSubmit={onFormSubmit}>
          <Input
            id="input-example"
            name="test-name"
            label="Sign In ID"
            onChange={(e) => setSignInId(e.currentTarget.value)}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </Col>
    </Row>
  );
};
