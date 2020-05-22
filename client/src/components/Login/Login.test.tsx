import React from "react";
import Login from "./Login";
import { render, fireEvent } from "@testing-library/react";

describe("<Login>", () => {
  it("Submits the sign in ID to the given function", async () => {
    const formSubmitSpy = jest.fn();
    const login = render(<Login formSubmit={formSubmitSpy} />);
    const input = await login.findByLabelText("Sign In ID");
    const submit = await login.findByText("Submit");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.submit(submit);
    expect(formSubmitSpy).toHaveBeenCalledWith("test");
  });
});
