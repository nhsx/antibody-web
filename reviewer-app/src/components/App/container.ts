import testApi, { TestApi } from "../../api/testApi";
import config from "../../api/config";

export interface AppContainer {
  testApi: TestApi;
}

const appContainer: AppContainer = {
  testApi: testApi({ apiBase: config.apiBase }),
};

export default appContainer;
