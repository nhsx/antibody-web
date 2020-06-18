import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { screen } from "@testing-library/react";
import { TestRoutes, PreviewRoutes } from "routes/TestRoutes";
import { renderWithReactIntl } from "utils/testUtils";

describe("TestRoutes", () => {
  describe("Support steps", () => {
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

  describe("Test steps", () => {
    beforeEach(() => {
      renderWithReactIntl(
        <MemoryRouter initialEntries={["/test/washAndDryHands"]}>
          <TestRoutes />
        </MemoryRouter>
      );
    });

    it("Renders the content component", async () => {
      const content = await screen.findByText(/Wash and dry hands/);
      expect(content).not.toBeUndefined();
    });

    it("Renders the correct number of steps", async () => {
      const content = await screen.findByText(/Step 1 of 11/);
      expect(content).not.toBeUndefined();
    });
  });

  describe("Previewing steps", () => {
    const renderPreviewStep = ({ step }: { step: string }) => {
      renderWithReactIntl(
        <MemoryRouter initialEntries={[`/preview/${step}`]}>
          <PreviewRoutes />
        </MemoryRouter>
      );
    };

    it("Allows you to preview content", async () => {
      renderPreviewStep({ step: "washAndDryHands" });
      const content = await screen.findByText(/Wash and dry hands/);
      expect(content).not.toBeUndefined();
    });

    it("Renders the correct number of steps", async () => {
      renderPreviewStep({ step: "washAndDryHands" });
      const content = await screen.findByText(/Step 1 of 8/);
      expect(content).not.toBeUndefined();
    });

    it("Links back to the initial test step on the final previewable step", async () => {
      renderPreviewStep({ step: "testBloodSample" });
      const content = await screen.findByTestId("primary-button");
      expect(content.getAttribute('href')).toBe("/test");
    });
  });
});