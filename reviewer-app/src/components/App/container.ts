import testApi, { TestApi } from "../../api/testApi";

export interface AppContainer {
  testApi: TestApi;
}

const appContainer: AppContainer = { testApi };

export default appContainer;
