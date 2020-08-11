import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import { renderWithReactIntl } from "utils/testUtils";
import _ from 'lodash';

const Thrower = () => {
  throw new Error("Test Error");
};

describe("<ErrorBoundary>", () => {

  beforeEach(() => {
    jest.spyOn(console, 'error');
    global.console.error = jest.fn().mockImplementation(_.noop);
  });
  
  afterEach(() => {
    global.console.error.mockRestore();
  });
  

  it("Renders the error component when a child element throws an error", async () => {
    const errorBoundary = renderWithReactIntl(
      <ErrorBoundary errorComponent={<div>testerror123</div>}>
        <Thrower />
      </ErrorBoundary>
    );
    await errorBoundary.findByText("testerror123");

  });

  it("Renders a generic fallback if no error component is supplied", async () => {
    const errorBoundary = renderWithReactIntl(
      <ErrorBoundary>
        <Thrower />
      </ErrorBoundary>
    );
    await errorBoundary.findByTestId('default-error');
  });
});
