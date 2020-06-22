import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { screen } from "@testing-library/react";
import TestRoutes from "routes/TestRoutes";
import { renderWithStubAppContext } from "utils/testUtils";

jest.mock("utils/AppConfig", () => ({
  getAppConfig: () => ({ imageUpload: false })
}));

describe("TestRoutes", () => {
  const renderTestStep = ({ mode, step }: { mode: string, step: string }) => {
    renderWithStubAppContext(
      <MemoryRouter initialEntries={[`/${mode}/${step}`]}>
        <TestRoutes />
      </MemoryRouter>
    );
  };


  describe("Support steps", () => {
    it("Renders the content component", async () => {
      renderTestStep({ mode: "test", step: "checkYourKit" });
      const content = await screen.findByText(/Check Your Kit/);
      expect(content).not.toBeUndefined();
    });

    it("There is a begin test link ", async () => {
      renderTestStep({ mode: "test", step: "checkYourKit" });
      const content = await screen.findByText(/Begin/);
      expect(content).not.toBeUndefined();
    });
  });

  describe("Test steps", () => {
    it("Renders the content component", async () => {
      renderTestStep({ mode: "test", step: "washAndDryHands" });
      const content = await screen.findByText(/Wash and dry hands/);
      expect(content).not.toBeUndefined();
    });

    it("Renders the correct number of steps", async () => {
      renderTestStep({ mode: "test", step: "washAndDryHands" });
      const content = await screen.findByText(/Step 1 of 11/);
      expect(content).not.toBeUndefined();
    });

    describe("With no image upload enabled", () => {
      it("Skips from the wait step to the what do you see step", async () => {
        renderTestStep({ mode: "test", step: "wait" });
        const content = await screen.findByTestId("primary-button");
        expect(content.getAttribute('href')).toBe("/test/whatDoYouSee");
      });
    });
  });

  describe("Previewing steps", () => {
    it("Allows you to preview content", async () => {
      renderTestStep({ mode: "preview", step: "washAndDryHands" });
      const content = await screen.findByText(/Wash and dry hands/);
      expect(content).not.toBeUndefined();
    });

    it("Renders the correct number of steps", async () => {
      renderTestStep({ mode: "preview", step: "washAndDryHands" });
      const content = await screen.findByText(/Step 1 of 8/);
      expect(content).not.toBeUndefined();
    });

    it("Links back to the initial test step on the final previewable step", async () => {
      renderTestStep({ mode: "preview", step: "testBloodSample" });
      const content = await screen.findByTestId("primary-button");
      expect(content.getAttribute('href')).toBe("/test");
    });
  });
});