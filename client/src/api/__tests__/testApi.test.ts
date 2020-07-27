import testApi, { HTTPError } from "../testApi";
import nock from "nock";

jest.mock("js-cookie", () => ({
  get: () => "stubCookie",
}));

describe("TestApi", () => {
  const apiBase = "https://meow.cat/dev";

  const testErrors = ({ stubRequest, callApi, expectedErrorCode }) => {
    describe("returning errors", () => {
      it("Throws an error", async () => {
        stubRequest();
        await expect(callApi()).rejects.toThrow(HTTPError);
      });

      it("Returns the status code in the error", async () => {
        stubRequest();
        let error: HTTPError | undefined;

        try {
          await callApi();
        } catch (e) {
          error = e;
        }

        expect(error).not.toBeUndefined();
        expect(error?.statusCode).toBe(expectedErrorCode);
      });
    });
  };

  beforeEach(() => {
    nock(apiBase).options(/.*/).reply(
      200,
      {},
      {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
      }
    );
  });

  describe("/generate", () => {
    it("Passes the cookie to the generate endpoint", async () => {
      const updateRequest = nock("https://meow.cat/dev")
        .post("/generate")
        .matchHeader("Authorization", "stubCookie")
        .reply(200, {});

      await testApi({ apiBase: "https://meow.cat/dev" }).generateTest();

      expect(updateRequest.isDone()).toBe(true);
    });

    it("Returns the response from the update endpoint", async () => {
      nock("https://meow.cat/dev")
        .post("/generate")
        .reply(200, { an: "example" });

      const response = await testApi({
        apiBase: "https://meow.cat/dev",
      }).generateTest();

      expect(response).toEqual({ an: "example" });
    });

    testErrors({
      stubRequest: () =>
        nock("https://meow.cat/dev")
          .post("/generate")
          .reply(404),
      callApi: () =>
        testApi({ apiBase: "https://meow.cat/dev" }).generateTest(),
      expectedErrorCode: 404,
    });
  });

  describe("/update", () => {
    it("Passes the parameters & cookie to the update endpoint", async () => {
      const updateRequest = nock("https://meow.cat/dev")
        .post("/update", { dog: "woof" })
        .matchHeader("Authorization", "stubCookie")
        .reply(200, {});

      await testApi({ apiBase: "https://meow.cat/dev" }).updateTest({
        dog: "woof",
      });

      expect(updateRequest.isDone()).toBe(true);
    });

    it("Returns the response from the update endpoint", async () => {
      nock("https://meow.cat/dev")
        .post("/update", { dog: "woof" })
        .reply(200, { an: "example" });

      const response = await testApi({
        apiBase: "https://meow.cat/dev",
      }).updateTest({ dog: "woof" });

      expect(response).toEqual({ an: "example" });
    });

    testErrors({
      stubRequest: () =>
        nock("https://meow.cat/dev")
          .post("/update", { dog: "woof" })
          .reply(403),
      callApi: () =>
        testApi({ apiBase: "https://meow.cat/dev" }).updateTest({
          dog: "woof",
        }),
      expectedErrorCode: 403,
    });
  });
});
