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
    let [, context] = renderWithStubAppContext(
      <MemoryRouter initialEntries={[`/${mode}/${step}`]}>
        <TestRoutes />
      </MemoryRouter>
    );

    return context;
  };


  describe("Support steps", () => {
    it("Renders the content component", async () => {
      renderTestStep({ mode: "test", step: "start" });
      const content = await screen.findByTestId("page-title");
      expect(content).not.toBeUndefined();
    });
  });

  describe("Test steps", () => {
    it("Renders the content component", async () => {
      renderTestStep({ mode: "test", step: "prickFinger" });
      const content = await screen.findByTestId("page-title");
      expect(content).not.toBeUndefined();
    });

    describe("With no image upload enabled", () => {
      it("Skips from the wait step to the end", async () => {
        renderTestStep({ mode: "test", step: "wait" });
        const content = await screen.findByTestId("primary-button");
        expect(content.getAttribute('href')).toBe("/test/testComplete");
      });
    });
  });

  describe("Previewing steps", () => {
    it("Allows you to preview content", async () => {
      renderTestStep({ mode: "preview", step: "prickFinger" });
      const content = await screen.findByTestId("page-title");
      expect(content).not.toBeUndefined();
    });

    it("Links back to the initial test step on the final previewable step", async () => {
      renderTestStep({ mode: "preview", step: "testBloodSample" });
      const content = await screen.findByTestId("primary-button");
      expect(content.getAttribute('href')).toBe("/test");
    });
  });
});