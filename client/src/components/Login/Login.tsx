import React, { useState, SyntheticEvent } from "react";
import { Row, Col, Form, Input, Button } from "nhsuk-react-components";
import { Portal } from 'react-portal';
import { FormattedMessage } from "react-intl";

interface LoginProps {
  formSubmit: Function;
}

export default (props: LoginProps) => {
  const { formSubmit } = props;
  const [signInId, setSignInId] = useState<string>("");

  const node = document.getElementById("portal-header");

  const onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    formSubmit(signInId);
  };

  return (
    <Row>
      {node && <Portal node={node}><FormattedMessage id={`screens.login.title`} /></Portal>}
      <Col width="two-thirds">
        <Form onSubmit={onFormSubmit}>
          <Input
            data-testid="login-input"
            id="sign-in-id"
            name="sign-in-id"
            label="Sign In ID"
            onChange={(e) => setSignInId(e.currentTarget.value)}
          />
          <Button
            data-testid="login-submit"
            type="submit">Submit</Button>
        </Form>
      </Col>
    </Row>
    
  );
};
