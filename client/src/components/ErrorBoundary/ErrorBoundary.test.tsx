import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import { renderWithReactIntl } from "utils/testUtils";

const Thrower = () => {
  throw new Error();
  return (
    <div>
    </div>
  );
};

describe("<ErrorBoundary>", () => {
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
