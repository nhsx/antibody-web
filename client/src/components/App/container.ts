import login from "../../usecases/login";
import testApi, { TestApi } from "api/testApi";
import apiConfig from "api/config";


export interface AppContainer {
  getLogin(): Function;
  getTestApi(): TestApi;
}

export class AppContainer implements AppContainer {
  getLogin() {
    return login();
  }

  getTestApi() {
    return testApi({ apiBase: apiConfig.apiBase });
  }
}
