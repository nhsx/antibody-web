import login from "../login";

describe("login()", () => {
  it("Returns unsuccessful when the user ID is invalid", () => {
    const response = login()("not valid");
    expect(response.successful).toEqual(false);
  });

  describe("When the user ID is valid", () => {
    it("Returns successful if the user is valid", () => {
      const response = login()("valid");
      expect(response.successful).toEqual(true);
    });
  });
});
