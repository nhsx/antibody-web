import React from 'react';
import { Row, Col, ActionLink } from "nhsuk-react-components";
import { Link } from 'react-router-dom';
import { START_STEP } from 'abt-lib/models/Steps';

export default () => {
  return (
    <Row>
      <Col width="full">
        You have {Math.random() > 0.5 ? "not" : ""} had COVID19.
        <ActionLink><Link to={`/test/${START_STEP}`}>Start Again</Link></ActionLink>
      </Col>
    </Row>
  );
};