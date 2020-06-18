import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { screen } from "@testing-library/react";
import { TestRoutes, PreviewRoutes } from "routes/TestRoutes";
import { renderWithReactIntl } from "utils/testUtils";
import AppContext from 'components/App/context';
import TestContext from 'components/TestContainer/context';

jest.mock("utils/AppConfig", () => ({
  getAppConfig: () => ({ imageUpload: false })
}));

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
    const renderTestStep = ({ step }: { step: string }) => {
      renderWithReactIntl(
        <AppContext.Provider value={{ state: { locale: "en-gb" }, setLocale: () => { }, setAppError: () => { }, dispatch: () => { }, container: { getTestApi: () => { } } }} >
          <TestContext.Provider
            value={{
              dispatch: () => { }, state: {
                testRecord: {
                  uploadUrl: "", downloadUrl: "", step, guid: "", timerStartedAt: 10
                }
              }
            }}>
            <MemoryRouter initialEntries={[`/test/${step}`]}>
              <TestRoutes />
            </MemoryRouter>
          </TestContext.Provider>
        </AppContext.Provider >
      );
    };

    it("Renders the content component", async () => {
      renderTestStep({ step: "washAndDryHands" });
      const content = await screen.findByText(/Wash and dry hands/);
      expect(content).not.toBeUndefined();
    });

    it("Renders the correct number of steps", async () => {
      renderTestStep({ step: "washAndDryHands" });
      const content = await screen.findByText(/Step 1 of 11/);
      expect(content).not.toBeUndefined();
    });

    describe("With no image upload enabled", () => {
      it("Skips from the wait step to the what do you see step", async () => {
        renderTestStep({ step: "wait" });
        const content = await screen.findByTestId("primary-button");
        expect(content.getAttribute('href')).toBe("/test/whatDoYouSee");
      });
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