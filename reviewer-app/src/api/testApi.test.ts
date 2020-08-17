import testApi from './testApi';

describe('testApi', () => {
  describe('nextResultToReview', () => {
    it('returns a hardcoded URL', async () => {
      const result = await testApi().nextResultToReview();

      expect(result.url).toEqual("https://cataas.com/cat");
    });
  });
});
