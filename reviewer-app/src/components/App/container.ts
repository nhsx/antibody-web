export interface AppContainer {
  testApi: TestApi;
}

interface TestApi {
  (): { nextResultToReview: () => Promise<{ url: string }> };
}

const testApi = () => ({
  nextResultToReview: async (): Promise<{ url: string }> => {
    return new Promise((resolve) =>
      resolve({
        url: "https://cataas.com/cat",
      })
    );
  },
});

const appContainer: AppContainer = { testApi };

export default appContainer;
