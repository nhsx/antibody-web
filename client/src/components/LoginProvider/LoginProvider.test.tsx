import React from "react";
import { LoginProvider } from "./LoginProvider";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("<LoginProvider>", () => {
  it("Renders the contents correctly when the user has the login cookie set", () => {
    const cookieStub = { get: () => "yes" };
    const provider = render(
      <LoginProvider cookies={cookieStub}>
        <span data-testid="children-elements">Meow</span>
      </LoginProvider>
    );

    expect(provider.getAllByTestId("children-elements")).toHaveLength(1);
  });

  it("Redirects to / if the user is not logged in", () => {
    const cookieStub = { get: () => undefined };
    const historySpy = createMemoryHistory({
      initialEntries: ["/some-route-with-login"],
    });

    render(
      <Router history={historySpy}>
        <LoginProvider cookies={cookieStub}>
          <div />
        </LoginProvider>
      </Router>
    );

    expect(historySpy.location.pathname).toEqual("/");
  });
});
