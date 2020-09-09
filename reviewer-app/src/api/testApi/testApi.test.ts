import testApi, { HTTPError } from "./testApi";
import nock from "nock";

jest.mock("aws-amplify", () => ({
  Auth: {
    currentSession: () => ({ getIdToken: () => ({ getJwtToken: () => "FakeTokenHere" }) }),
  },
}));

describe("testApi", () => {
  const apiBase = "http://baseurl.com";
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Content-Type": "application/json",
  };

  beforeEach(() => {
    nock(apiBase).options(/.*/).reply(200, {}, corsHeaders);
  });

  describe("nextResultToReview", () => {
    it("Attempts to get the next result from the API", async () => {
      const request = nock(apiBase)
        .get("/results/next")
        .reply(200, { cat: "meow" }, corsHeaders);

      await testApi({ apiBase }).nextResultToReview();
      expect(request.isDone()).toEqual(true);
    });

    it("Sends the session token to the API for authorisation", async () => {
      const request = nock(apiBase)
        .get("/results/next")
        .matchHeader("Authorization", "Bearer FakeTokenHere")
        .reply(200, { cat: "meow" }, corsHeaders);

      await testApi({ apiBase }).nextResultToReview();
      expect(request.isDone()).toEqual(true);
    });

    it("Returns the response from the api", async () => {
      nock(apiBase)
        .get("/results/next")
        .reply(200, { cat: "meow" }, corsHeaders);

      const response = await testApi({ apiBase }).nextResultToReview();
      expect(response).toEqual({ cat: "meow" });
    });

    describe("Error handling", () => {
      it("throws an error", async () => {
        nock(apiBase).get("/results/next").reply(404, {}, corsHeaders);

        await expect(testApi({ apiBase }).nextResultToReview()).rejects.toThrow(
          HTTPError
        );
      });

      it("Returns the status code in the error", async () => {
        nock(apiBase).get("/results/next").reply(404, {}, corsHeaders);
        let error: HTTPError | undefined;

        try {
          await testApi({ apiBase }).nextResultToReview();
        } catch (e) {
          error = e;
        }

        expect(error).not.toBeUndefined();
        expect(error?.statusCode).toBe(404);
      });
    });
  });
});
