import login from "../../usecases/login";
import testApi, { TestApi } from "api/testApi";
import apiConfig from "api/config";

export interface AppContainer {
  getLogin(): Function;
  getTestApi(): TestApi;
}

export default class Container implements AppContainer {
  private testApi: undefined | TestApi;

  constructor() {
    this.testApi = undefined;
  }

  getLogin = () => {
    return login();
  };

  getTestApi = () => {
    if (this.testApi) {
      return this.testApi;
    } else {
      this.testApi = testApi({ apiBase: apiConfig.apiBase });
      return this.testApi;
    }
  };
}
