import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import CognitoLogin from '.';
import { act } from 'react-dom/test-utils';
import { AppContainer } from 'components/App/container';

describe("<CognitoLogin>", () => {
  const userStub = { signInUserSession: { accessToken: { payload: { "cognito:groups": ["cat-gang"] } } } };
  let login;
  let container: AppContainer = {
    getCurrentUserDetails: () => { },
    testApi: {} as any,
    authenticationApi: {} as any
  };

  const renderLogin = async () => {
    await act(async () => {
      login = await render(<CognitoLogin container={container} ><div data-testid="find-me"></div></CognitoLogin>);
    });
  };

  it("Gets the current login details", async () => {
    const getCurrentUserDetailsStub = jest.fn(() => new Promise((resolve) => resolve({ user: userStub, loggedIn: true })));
    container.getCurrentUserDetails = getCurrentUserDetailsStub;

    await renderLogin();
    expect(getCurrentUserDetailsStub).toHaveBeenCalled();
  });

  describe("When the user is already logged in", () => {
    beforeEach(async () => {
      const getCurrentUserDetailsStub = jest.fn(() => new Promise((resolve) => resolve({ user: userStub, loggedIn: true })));
      const signOutStub = jest.fn();
      container.getCurrentUserDetails = getCurrentUserDetailsStub;
      container.authenticationApi = { signOut: signOutStub };

      await renderLogin();
    });

    it("Displays the child contents", async () => {
      const content = await login.findByTestId("find-me");
      expect(content).toBeInTheDocument();
    });

    it("Displays the sign out button", async () => {
      const signOutButton = await login.findByText("Sign out");
      expect(signOutButton).toBeInTheDocument();
    });

    it("Allows the user to sign out", async () => {
      await act(async () => {
        const signOutButton = await login.findByText("Sign out");
        fireEvent.click(signOutButton);
      });

      expect(container.authenticationApi.signOut).toHaveBeenCalled();
    });

    it("Displays the login form after sign out", async () => {
      await act(async () => {

        const signOutButton = await login.findByText("Sign out");
        fireEvent.click(signOutButton);
      });

      const loginForm = await login.findByTestId("login-form");
      expect(loginForm).toBeInTheDocument();
    });
  });

  describe("When the user is not already logged in", () => {
    it("Does not display the child contents", async () => {
      const getCurrentUserDetailsStub = jest.fn(() => new Promise((resolve) => resolve({ loggedIn: false })));
      container.getCurrentUserDetails = getCurrentUserDetailsStub;

      await renderLogin();

      const content = await login.queryByTestId("find-me");
      expect(content).not.toBeInTheDocument();
    });
  });

  describe("State: Login", () => {
    const loginWithDetails = async (loginComponent, username, password) => {
      const usernameInput = await loginComponent.findByLabelText("Username");
      const passwordInput = await loginComponent.findByLabelText("Password");
      const continueButton = await loginComponent.findByText("Continue");
      fireEvent.change(usernameInput, { target: { value: username } });
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.submit(continueButton);
    };

    beforeEach(() => {
      const getCurrentUserDetailsStub = jest.fn(() => new Promise((resolve) => resolve({ loggedIn: false })));
      container.getCurrentUserDetails = getCurrentUserDetailsStub;
    });

    it("Logs the user in on the authentication API", async () => {
      const signInSpy = jest.fn(() => new Promise((resolve) => resolve({ user: userStub, successful: true })));
      const authenticationApi = { signIn: signInSpy };
      container = { ...container, authenticationApi };

      await act(async () => {
        await renderLogin();
        await loginWithDetails(login, "meow", "cat");
      });

      expect(signInSpy).toHaveBeenCalledWith({ username: "meow", password: "cat" });
    });

    describe("When the login is successful", () => {
      it("Displays the child content", async () => {
        const signInSpy = jest.fn(() => new Promise((resolve) => resolve({ user: userStub, successful: true })));
        const authenticationApi = { signIn: signInSpy };
        container = { ...container, authenticationApi };

        await act(async () => {
          await renderLogin();
          await loginWithDetails(login, "meow", "cat");
        });

        const content = await login.findByTestId("find-me");
        expect(content).not.toBeUndefined();
      });
    });

    describe("When the user has to change their password on first login", () => {
      it("Displays the new password form", async () => {
        const signInSpy = jest.fn(() => new Promise((resolve) => resolve({ user: userStub, successful: true, requiresNewPassword: true })));
        const authenticationApi = { signIn: signInSpy };
        container = { ...container, authenticationApi };

        await act(async () => {
          await renderLogin();
          await loginWithDetails(login, "meow", "cat");
        });

        const content = await login.findByTestId("new-password-form");
        expect(content).toBeInTheDocument();
      });

      it("Allows the user to change their password", async () => {
        const signInSpy = jest.fn(() => new Promise((resolve) => resolve({ user: userStub, successful: true, requiresNewPassword: true })));
        const newPasswordSpy = jest.fn(() => new Promise((resolve) => resolve({ successful: true })));

        const authenticationApi = { signIn: signInSpy, newPassword: newPasswordSpy };
        container = { ...container, authenticationApi };

        await act(async () => {
          await renderLogin();
          await loginWithDetails(login, "meow", "cat");
          const newPasswordInput = await login.findByLabelText("New password");
          const continueButton = await login.findByText("Continue");
          fireEvent.change(newPasswordInput, { target: { value: "woof" } });
          fireEvent.submit(continueButton);
        });

        expect(newPasswordSpy).toHaveBeenCalledWith({ user: userStub, newPassword: "woof" });
      });
    });
  });
});