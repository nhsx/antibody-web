import { load } from "../pageObjects/index";
import { getLoginInput, getLoginSubmit } from "../pageObjects/login";

describe("Login", () => {
  beforeEach(async () => {
    await load();
  });

  it("should display the login form", async () => {
    await getLoginInput();
    await getLoginSubmit();
  });
});
