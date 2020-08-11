import React from 'react';
import TestContainer from "../TestContainer";
import { MemoryRouter } from "react-router-dom";
import { screen } from "@testing-library/react";
import { renderWithStubAppContext } from "utils/testUtils";

describe("TestContainer", () => {
  const renderTestStep = async ({ step, api = {} }: { step: string, api?: object }) => {
    const [, context] = renderWithStubAppContext(
      <MemoryRouter initialEntries={[`/test/x`]}>
        <TestContainer step={step}>
          <div data-testid="render-check" />
        </TestContainer>
      </MemoryRouter>, api
    );
    await screen.findAllByTestId("render-check");

    return context;
  };

  it("Renders the content within the test container", async () => {
    await renderTestStep({ step: "x" });
    const content = await screen.findAllByTestId("render-check");
    expect(content.length).toBe(1);
  });

  it("Attempts to generate a new test record", async () => {
    const context = await renderTestStep({ step: "checkYourKit" });
    let generateTest = context.container.getTestApi().generateTest;
    expect(generateTest).toHaveBeenCalled();
  });

  it("Updates the test on the api", async () => {
    const context = await renderTestStep({ step: "checkYourKit" });
    let updateTest = context.container.getTestApi().updateTest;
    expect(updateTest).toHaveBeenCalledWith({ testRecord: { step: "checkYourKit", timerStartedAt: 10 } });
  });
});
