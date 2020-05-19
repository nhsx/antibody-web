import React from "react";
import Asset from "../../ui/Asset";
import { Row, Col } from "nhsuk-react-components";

export default () => (
  <Row>
    <Col width="full">
      <Asset
        src="kit.png"
        alt="Image of the test kit"
        width={201}
        height={203}
      />
      <ul className="nhsuk-list nhsuk-list--bullet">
        <li>It takes about 15 to 20 minutes to do the test</li>
        <li>Choose a well lit room</li>
        <li>Choose a flat clean dry surface</li>
        <li>Remove pipette and test device from packaging</li>
        <li>Carefully twist and pull cap off lancet</li>
      </ul>
    </Col>
  </Row>
);
