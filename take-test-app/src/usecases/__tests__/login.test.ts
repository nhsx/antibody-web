import login from "../login";

describe("login()", () => {
  it("Returns unsuccessful when the user ID is invalid", async () => {
    await expect(login()("not valid")).rejects.toMatchObject({
      successful: false
    });
  });

  describe("When the user ID is valid", () => {
    it("Returns successful if the user is valid", async () => {
      const response = await login()("valid");
      expect(response.successful).toEqual(true);
    });
  });
});
