import React from 'react';
import ResultSelector from '.';
import { render, fireEvent } from "@testing-library/react";
import { AppContainer } from 'components/App/container';

describe("<ResultSelector>", () => {
  let container: AppContainer = {
    getCurrentUserDetails: () => { },
    testApi: {} as any,
    authenticationApi: {} as any
  };
  let testResult = {};

  it("Allows you to submit a result", async () => {
    container.testApi.submitReview = jest.fn();

    const selector = await render(<ResultSelector
      container={container}
      testResult={testResult}
    />);

    const positiveInput = await selector.findByLabelText("Positive");
    const submit = await selector.findByText("Submit");
    await fireEvent.click(positiveInput);
    await fireEvent.click(submit);
    expect(container.testApi.submitReview).toHaveBeenCalledWith({ testResult, humanResult: "positive" });
  });
});
