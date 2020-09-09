import { Auth } from "aws-amplify";
import {
  AuthenticationApi,
  SignInResponse,
  NewPasswordResponse,
} from "./authenticationApi";

const authenticationApi: AuthenticationApi = {
  signIn: async ({ username, password }) => {
    let response: SignInResponse = {
      user: undefined,
      successful: false,
      requiresNewPassword: false,
    };

    await Auth.signIn({ username, password })
      .then((user) => {
        response.user = user;
        response.successful = true;
        response.requiresNewPassword =
          user.challengeName === "NEW_PASSWORD_REQUIRED";
      })
      .catch((err) => {
        response.successful = false;
        response.errors = [err.message];
      });
    return response;
  },

  newPassword: async ({ user, newPassword }) => {
    let response: NewPasswordResponse = {
      successful: false,
    };

    await Auth.completeNewPassword(user, newPassword, {})
      .then(() => {
        response.successful = true;
      })
      .catch((error) => {
        response.successful = false;
        response.errors = [error.message];
      });

    return response;
  },

  signOut: async () => {
    return Auth.signOut();
  },
};

export default authenticationApi;
