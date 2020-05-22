import login from "../../usecases/login";
import testApi, { TestApi } from "api/testApi";


export interface AppContainer {
  getLogin(): Function;
  getTestApi(): TestApi;
}

export class AppContainer implements AppContainer {
  getLogin() {
    return login();
  }

  getTestApi() {
    return testApi;
  }
}
