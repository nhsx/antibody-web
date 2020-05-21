import login from "../../usecases/login";

export interface AppContainer {
  getLogin(): Function;
}

export class AppContainer implements AppContainer {
  getLogin() {
    return login();
  }
}
