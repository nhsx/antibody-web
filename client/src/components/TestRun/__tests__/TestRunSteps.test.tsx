import React from "react";
import TestRunSteps from "../TestRunSteps";
import { MemoryRouter, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";

describe("TestRunSteps", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/testrunsteps/asdf/checkYourKit"]}>
        <Route path="/testrunsteps/:testRunUID/:step">
          <TestRunSteps />
        </Route>
      </MemoryRouter>
    );
  });

  it("Renders the title correctly", async () => {
    const title = await screen.findByText(/Check your test kit/);
    expect(title).not.toBeUndefined();
  });

  it("Renders the content component", async () => {
    const content = await screen.findByText(/Your test kit should include/);
    expect(content).not.toBeUndefined();
  });

  it("Renders the steps", async () => {
    const content = await screen.findByTestId("step-counter");
    expect(content.textContent?.startsWith("Step 1 of")).toEqual(true);
  });
});
