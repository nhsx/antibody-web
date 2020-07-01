import React, { useState, SyntheticEvent } from "react";
import { Row, Col, Form, Input, Button } from "nhsuk-react-components";
import { Portal } from 'react-portal';
import { FormattedMessage } from "react-intl";
import { AuthenticateRequest } from "abt-lib/requests/Authenticate";

interface LoginProps {
  formSubmit(request: AuthenticateRequest);
}

export default (props: LoginProps) => {
  const { formSubmit } = props;
  const [ orderId, setOrderId] = useState<string>("");
  const [ dateOfBirth, setDateOfBirth ] = useState<string>("");
  const [ postcode, setPostcode ] = useState<string>("");

  const node = document.getElementById("portal-header");

  const onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    formSubmit({
      dateOfBirth,
      postcode,
      orderId
    });
  };

  return (
    <Row>
      {node && <Portal node={node}><FormattedMessage id={`screens.login.title`} /></Portal>}
      <Col width="two-thirds">
        <Form onSubmit={onFormSubmit}>
          <Input
            data-testid="login-id"
            id="order-id"
            name="order-id"
            label="Sign In ID"
            onChange={(e) => setOrderId(e.currentTarget.value)}
          />
          <Input
            data-testid="login-dob"
            id="sign-in-dob"
            name="sign-in-dob"
            label="Date of Birth"
            onChange={(e) => setDateOfBirth(e.currentTarget.value)}
          />
          <Input
            data-testid="login-postcode"
            id="sign-in-postcode"
            name="sign-in-postcode"
            label="Postcode"
            onChange={(e) => setPostcode(e.currentTarget.value)}
          />
          <Button
            data-testid="login-submit"
            type="submit">Submit</Button>
        </Form>
      </Col>
    </Row>
    
  );
};
