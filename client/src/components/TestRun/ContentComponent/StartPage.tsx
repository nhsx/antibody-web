import React from "react";
import { Row, Col, Label, BodyText, InsetText } from "nhsuk-react-components";
import { ContinueButton } from "components/ui/Buttons";
import { StepProps } from "./Step";

const Expander = ({ summary, children }: { summary: string, children: React.ReactNodeArray }) => {
  return (
    <details className="nhsuk-details nhsuk-expander">
      <summary className="nhsuk-details__summary">
        <span className="nhsuk-details__summary-text">{summary}</span>
      </summary>
      <div className="nhsuk-details__text">
        {children}
      </div>
    </details>
  );
};

export default (props: StepProps) => {
  return (
    <Row>
      <Col width="two-thirds">
        <Label size="l"><span data-testid="page-title">Your coronavirus antibody home test</span></Label>
        <BodyText>Thank you for taking part in the national research study into coronavirus (COVID-19). Taking the test helps NHS and medical scientists learn more about the virus.</BodyText>
        <InsetText>Your test kit should arrive 23 June 2020. If it is more than 7 days late, you can order a new one.</InsetText>
        <BodyText>Use this service to guide you through these steps:</BodyText>
        <ol className="nhsuk-list nhsuk-list--number">
          <li>learn about your test kit</li>
          <li>take your test</li>
          <li>submit a photo of your test kit</li>
        </ol>
        <BodyText>Your kit comes with paper instructions you can use if you want.</BodyText>
        <Expander summary="Reminder: how to get your results">
          <BodyText>Reminder - the test kit you ordered</BodyText>
          <ul className="nhsuk-list nhsuk-list--bullet">
            <li>You do not have to return anything in the post to get your results</li>
            <li>You just take the test and send us a photo of your test device</li>
            <li>We will email your result in 2 to 4 working days</li>
          </ul>
        </Expander>
        <Expander summary="What your test can and cannot tell you">
          <BodyText>The test is being used for research purposes only.</BodyText>
          <BodyText>It can only tell you if it is likely or unlikely that you have had the virus before.</BodyText>
          <BodyText>The test cannot tell you:</BodyText>
          <ul className="nhsuk-list nhsuk-list--bullet">
            <li>if you’ve definitely had the virus before</li>
            <li>if you’re immune to coronavirus</li>
            <li>if you've got the virus at the time you take the test (a “current infection”)</li>
          </ul>
          <BodyText>Doctors do not know if coronavirus antibodies protect you from getting the virus again or spreading it. Because of this, it is important that you continue to follow the same guidelines as everyone else regardless of your test result.</BodyText>
          <BodyText><a href="#abc">Find out more antibodies and coronavirus</a>.</BodyText>
          <BodyText><a href="#abc">Find out how to protect yourself and others from the virus</a>.</BodyText>
        </Expander>
        <Expander summary="Why antibody research is needed">
          <BodyText>COVID-19 is a new virus and the NHS and medical scientists need to learn more about it.</BodyText>
          <BodyText>Antibody testing wll help them answer these questions:</BodyText>
          <ul className="nhsuk-list nhsuk-list--bullet">
            <li>how many people in the UK have had the virus</li>
            <li>how the virus has spread across the UK - nationally and at a regional and local level    </li>
            <li>how the virus affects people of different ethnic backgrounds</li>
            <li>how home testing services can be improved</li>
          </ul>
          <BodyText>With this data, the NHS and UK can plan its response to the spread of the virus.</BodyText>
          <BodyText>No personal identifiable information will be used in the research.</BodyText>
          <BodyText><a href="#abc">Read more about how your personal information is kept safe and protected</a>.</BodyText>
        </Expander>
        <ContinueButton
          href={props.next}
          text="Take the test"
        />
      </Col>
    </Row>
  );
};
