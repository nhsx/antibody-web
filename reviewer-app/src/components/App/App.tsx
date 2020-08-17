import React from 'react';
import TestResult from '../TestResult';
import appContainer from './container';
import { Header, Container, Row, Col } from 'nhsuk-react-components';

function App() {
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
              <TestResult container={appContainer} />
            </Col>
          </Row>
        </main>
      </Container>
    </>
  );
}

export default App;
