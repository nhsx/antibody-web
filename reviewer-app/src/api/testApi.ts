export interface TestApi {
  (): { nextResultToReview: () => Promise<{ url: string }> };
}

export default () => ({
  nextResultToReview: async (): Promise<{ url: string }> => {
    return new Promise((resolve) =>
      resolve({
        url: "https://cataas.com/cat",
      })
    );
  },
});
