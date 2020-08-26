import React, { useEffect } from "react";
import { Row, Col, Label, Input } from "nhsuk-react-components";
import { Button } from "nhsuk-react-components";
import { AppContainer } from "components/App/container";

type CognitoLoginProps = {
  container: AppContainer,
  children: React.ReactNode
};

const New = ({ container, children }: CognitoLoginProps) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [authState, setAuthState] = React.useState<string>("login");
  const [user, setUser] = React.useState<any>(undefined);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [newPassword, setNewPassword] = React.useState<string>("");

  const onLogin = async (e) => {
    e.preventDefault();
    const signInResponse = await container.authenticationApi.signIn({ username, password });
    if (signInResponse.successful && signInResponse.requiresNewPassword) {
      setUser(signInResponse.user);
      setAuthState("newPassword");
    } else if (signInResponse.successful) {
      setUser(signInResponse.user);
      setAuthState("loggedIn");
    }
  };

  const onNewPassword = async (e) => {
    e.preventDefault();
    const newPasswordResponse = await container.authenticationApi.newPassword({ user, newPassword });
    if (newPasswordResponse.successful) {
      setAuthState("loggedIn");
    }
  };

  const signOut = async () => {
    await container.authenticationApi.signOut();
    setAuthState("login");
  };

  useEffect(() => {
    const getInitialAuthState = async () => {
      const response = await container.getCurrentUserDetails();
      if (response.loggedIn) {
        setAuthState("loggedIn");
        setUser(response.user);
      }

      setLoading(false);
    };
    getInitialAuthState();
  }, [container]);

  if (loading) {
    return <div data-testid="loading" />;
  }

  if (authState === "loggedIn") {
    return <>
      <Row>
        <Col width="two-thirds">
          <Button onClick={signOut}>Sign out</Button>
          <Label size="l">User group: {user.signInUserSession.accessToken.payload["cognito:groups"][0]}</Label>
        </Col>
      </Row>
      {children}
    </>;
  }

  if (authState === "newPassword") {
    return (
      <>
        <Row>
          <Col width="two-thirds">
            <form
              onSubmit={onNewPassword}
              data-testid="new-password-form"
            >
              <Input
                type="password"
                onChange={(e) => setNewPassword(e.currentTarget.value)}
                label="New password"
                value={newPassword} />
              <Button type="submit">Continue</Button>
            </form>
          </Col>
        </Row>
      </>
    );
  }

  return <>
    <Row>
      <Col width="two-thirds">
        <form
          onSubmit={onLogin}
          data-testid="login-form"
        >
          <Input
            type="text"
            onChange={(e) => setUsername(e.currentTarget.value)}
            label="Username"
            value={username} />
          <Input
            type="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
            label="Password"
            value={password} />
          <Button type="submit">Continue</Button>
        </form>
      </Col>
    </Row>
  </>;
};

export default New;