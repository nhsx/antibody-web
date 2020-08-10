import React from "react";
import { Home } from "./Home";
import { render } from "@testing-library/react";

describe("<Home>", () => {
  it("Renders correctly", async () => {
    const getLoginStub = jest.fn();
    const homePage = render(
      <Home app={{ container: { getLogin: () => getLoginStub } }} />
    );
    const serviceName = homePage.findByTestId("service-name");

    expect(serviceName).not.toBeUndefined();
  });
});
