import React from 'react';
import { Row, Col, BodyText, Label } from "nhsuk-react-components";
import { ContinueButton } from "components/ui/Buttons";
import { FormattedDate } from 'react-intl';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <Row>
      <Col width="full">
        <Label size="l">
          <FormattedDate
            value={new Date()}
            month="short"
            year="numeric"
            day="numeric" />
        </Label>
        <BodyText>
          The test found coronavirus antibodies in your blood sample.
        </BodyText>
        <BodyText>
          This is called a "positive" result.
        </BodyText>
        <BodyText>
          It means you have had coronavirus (Covid-19) before.
        </BodyText>
        <BodyText>
          This result has been emailed to you and shared with your GP (if you have one).
        </BodyText>
        <Label size="m">What this result means</Label>
        <BodyText>
          Covid-19 is a new virus so doctors do not know how effective (if at all) antibodies are.
        </BodyText>
        <BodyText>
          Because of this, you must continue to protect yourself and others from the virus and follow the same guidelines as everyone else.
        </BodyText>
        <BodyText>
          <Link to="#">How to protect yourself and others</Link>
        </BodyText>
        <BodyText>
          <Link to="#">Antibodies and immunity (NHS guidance)</Link>
        </BodyText>
        <Label size="m">Thank you</Label>
        <BodyText>
          By taking this test you're helping scientists and the NHS learn more about Covid-19. For example, where the virus is spreading in the UK and how it is affecting different people.
        </BodyText>

        <ContinueButton
          text="Return to main menu"
          href={`/`}
        />
      </Col>
    </Row>
  );
};
