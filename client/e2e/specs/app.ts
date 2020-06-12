import { load, getTitle } from "../pageObjects/index";

describe("App", () => {
  beforeEach(async () => {
    await load();
  });

  it("should show the correct intro", async () => {
    await expect(getTitle()).resolves.toContain("NHS");
  });
});
