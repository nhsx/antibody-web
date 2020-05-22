import React from 'react';
import { Row, Col } from "nhsuk-react-components";

export default () => {
  return (
    <Row>
      <Col width="full">
        You have {Math.random() > 0.5 ? "not" : ""} had COVID19.
      </Col>
    </Row>
  );
};