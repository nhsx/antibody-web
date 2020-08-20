import React from 'react';
import TestResult from '../TestResult';
import appContainer from './container';
import { Header, Container, Row, Col, Label } from 'nhsuk-react-components';
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

function App() {
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
        <Header transactional>
          <Header.Container>
            <Header.Logo href="/" />
            <Header.ServiceName href="/">
              Coronavirus home testing
            </Header.ServiceName>
          </Header.Container>
        </Header>
        <Container>
          <main className="nhsuk-main-wrapper nhsuk-main-wrapper--s">
            <Row>
              <Col width="two-thirds">
                <AmplifySignOut />
                <Label size="l">User group: {user.signInUserSession.accessToken.payload["cognito:groups"][0]}</Label>
                <TestResult container={appContainer} />
              </Col>
            </Row>
          </main>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Header transactional>
          <Header.Container>
            <Header.Logo href="/" />
            <Header.ServiceName href="/">
              Coronavirus home testing
            </Header.ServiceName>
          </Header.Container>
        </Header>
        <Container>
          <main className="nhsuk-main-wrapper nhsuk-main-wrapper--s">
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
          </main>
        </Container>
      </>
    );
  }
}

export default App;
