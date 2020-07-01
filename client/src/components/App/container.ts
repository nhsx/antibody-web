import login from "../../usecases/login";
import testApi, { TestApi } from "api/testApi";
import userApi, { UserApi } from "api/userApi";


export interface AppContainer {
  getLogin();
  getTestApi(): TestApi;
  getUserApi(): UserApi;
}

export class AppContainer implements AppContainer {
  getLogin() {
    return login();
  }

  getUserApi() {
    return userApi;
  }

  getTestApi() {
    return testApi;
  }
}
