import React, { useState, SyntheticEvent } from "react";
import { Row, Col, Form, Input, Button, Details } from "nhsuk-react-components";
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
        <Details>
          <Details.Summary>What do I enter to login?</Details.Summary>
          <Details.Text>
            <p>You can login by entering anything beginning with the word "valid" - this will be your user ID and so try and make sure it's unique.</p>
            <p>Addtionally, if you wish to test error messages from the image interpretation, you can include the following words in your login to trigger them:</p>
            <ul>
              <li>blur - Blurry image</li>
              <li>over - Over exposed image</li>
              <li>under - Under exposed image</li>
              <li>overunder - Both over & under exposed image</li>
              <li>nordt - No RDT in the image</li>
              <li>nodiagnostic - No diganostic zone found</li>
            </ul>
          </Details.Text>
        </Details>
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
