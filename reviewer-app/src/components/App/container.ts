import testApi, { TestApi } from "../../api/testApi/testApi";
import cognitoAuthenticationApi from "../../api/authenticationApi/cognitoAuthenticationApi";
import config from "../../api/config";
import { Auth } from "aws-amplify";
import { AuthenticationApi } from "api/authenticationApi/authenticationApi";

export interface AppContainer {
  testApi: TestApi;
  authenticationApi: AuthenticationApi;
  getCurrentUserDetails: any;
}

const appContainer: AppContainer = {
  testApi: testApi({ apiBase: config.apiBase }),
  authenticationApi: cognitoAuthenticationApi,
  getCurrentUserDetails: async () => {
    return Auth.currentAuthenticatedUser()
      .then((user) => ({ user, loggedIn: true }))
      .catch(() => ({ loggedIn: false }));
  },
};

export default appContainer;
