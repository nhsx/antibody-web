import testApi, { TestApi } from "../../api/testApi";
import config from "../../api/config";
import { Auth } from "aws-amplify";

export interface AppContainer {
  testApi: TestApi;
  getCurrentUserDetails: any;
  authenticationApi: any;
}

interface SignInResponse {
  user: any;
  successful: boolean;
  requiresNewPassword: boolean;
  errors: any[];
}

const appContainer: AppContainer = {
  testApi: testApi({ apiBase: config.apiBase }),
  getCurrentUserDetails: async () => {
    return Auth.currentAuthenticatedUser()
      .then((user) => ({ user, loggedIn: true }))
      .catch(() => ({ loggedIn: false }));
  },
  authenticationApi: {
    signIn: async ({ username, password }): Promise<SignInResponse> => {
      let response: SignInResponse = {
        user: undefined,
        successful: false,
        requiresNewPassword: false,
        errors: [],
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
          response.errors.push(err.message);
        });
      return response;
    },
    newPassword: async ({ user, newPassword }) => {
      let response = {
        successful: false,
      };

      await Auth.completeNewPassword(user, newPassword, {})
        .then(() => {
          response.successful = true;
        })
        .catch((error) => {
          console.log(error);
          response.successful = false;
        });

      return response;
    },
    signOut: async () => {
      return Auth.signOut();
    },
  },
};

export default appContainer;
