import AppContainer from "../container";

describe("AppContainer", () => {
  describe("getTestApi", () => {
    it("Always returns the same instance", () => {
      const container = new AppContainer();
      const instanceOne = container.getTestApi();
      const instanceTwo = container.getTestApi();
      expect(instanceOne).toEqual(instanceTwo);
    });
  });
});
