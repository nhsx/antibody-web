import React from "react";
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn } from "@aws-amplify/ui-react";
import { Row, Col, Label } from "nhsuk-react-components";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

export default ({ children }) => {
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<any>();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  if (authState === AuthState.SignedIn && user) {
    return (
      <>
        <Row>
          <Col width="two-thirds">
            <AmplifySignOut />
            <Label size="l">
              User group:{" "}
              {user.signInUserSession.accessToken.payload["cognito:groups"][0]}
            </Label>
          </Col>
        </Row>
        {children}
      </>
    );
  } else {
    return (
      <>
        <Row>
          <Col width="two-thirds">
            <AmplifyAuthenticator usernameAlias="email">
              <AmplifySignIn
                headerText="Sign in to the reviewer service"
                slot="sign-in"
                hideSignUp
              />
            </AmplifyAuthenticator>
          </Col>
        </Row>
      </>
    );
  }
};
