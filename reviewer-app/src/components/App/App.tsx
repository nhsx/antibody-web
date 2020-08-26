import React from 'react';
import TestResult from '../TestResult';
import Layout from '../Layout';
import appContainer from './container';
import CognitoLogin from '../CognitoLogin';
import { Row, Col } from 'nhsuk-react-components';

function App() {
  return (
    <Layout>
      <CognitoLogin container={appContainer}>
        <Row>
          <Col width="two-thirds">
            <TestResult container={appContainer} />
          </Col>
        </Row>
      </CognitoLogin>
    </Layout>
  );
}

export default App;
