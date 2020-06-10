import React from "react";
import { MemoryRouter } from "react-router-dom";
import {  screen } from "@testing-library/react";
import { TestRoutes } from "routes/TestRoutes";
import { renderWithReactIntl } from "utils/testUtils";

describe("TestRunSteps", () => {
  beforeEach(() => {
    renderWithReactIntl(
      <MemoryRouter initialEntries={["/test/checkYourKit"]}>
        <TestRoutes />
      </MemoryRouter>
    );
  });

  it("Renders the content component", async () => {
    const content = await screen.findByText(/Check Your Kit/);
    expect(content).not.toBeUndefined();
  });

  it("There is a begin test link ", async () => {
    const content = await screen.findByText(/Begin/);
    expect(content).not.toBeUndefined();
  });
});
