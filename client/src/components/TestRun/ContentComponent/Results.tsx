import React from 'react';
import { Row, Col, ActionLink } from "nhsuk-react-components";
import { Link } from 'react-router-dom';

export default () => {
  return (
    <Row>
      <Col width="full">
        You have {Math.random() > 0.5 ? "not" : ""} had COVID19.
        <ActionLink><Link to={"/test/checkYourKit"}>Start Again</Link></ActionLink>
      </Col>
    </Row>
  );
};