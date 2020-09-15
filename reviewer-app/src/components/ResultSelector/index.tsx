import React, { useState } from 'react';
import { Button, Fieldset, Radios } from 'nhsuk-react-components';
import { AppContainer } from 'components/App/container';
import { TestResult } from 'api/testApi/testApi';
import { HumanResult } from 'abt-lib/models/Review';

export default ({ container, testResult }: { container: AppContainer, testResult: TestResult }) => {
  const [humanResult, setHumanResult] = useState<HumanResult>();

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (humanResult !== undefined) {
      container.testApi.submitReview({ testResult, humanResult });
    }
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <Fieldset>
          <Fieldset.Legend>Have you changed your name?</Fieldset.Legend>
          <Radios
            name="example"
            hint="This includes changing your last name or spelling your name differently."
          >
            <Radios.Radio
              id="example-1"
              onChange={() => setHumanResult("positive")}
              value="positive">
              Positive
            </Radios.Radio>
            <Radios.Radio
              id="example-2"
              onChange={() => setHumanResult("negative")}
              value="no">
              Negative
            </Radios.Radio>
          </Radios>
        </Fieldset>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};
