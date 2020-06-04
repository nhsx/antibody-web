import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { TestRoutes } from "routes/TestRoutes";


describe("TestRunSteps", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/test/checkYourKit"]}>
        <TestRoutes />
      </MemoryRouter>
    );
  });

  it("Renders the content component", async () => {
    const content = await screen.findByText(/Your test kit should include/);
    expect(content).not.toBeUndefined();
  });

  it("There is a continue link ", async () => {
    const content = await screen.findByText(/Continue/);
    expect(content).not.toBeUndefined();
  });
});
