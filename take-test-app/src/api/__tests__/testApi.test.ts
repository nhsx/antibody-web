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
      const generateRequest = nock(apiBase)
        .post("/generate")
        .matchHeader("Authorization", "stubCookie")
        .reply(200, {});

      await testApi({ apiBase: apiBase }).generateTest();

      expect(generateRequest.isDone()).toBe(true);
    });

    it("Returns the response from the update endpoint", async () => {
      nock(apiBase).post("/generate").reply(200, { an: "example" });

      const response = await testApi({
        apiBase: apiBase,
      }).generateTest();

      expect(response).toEqual({ an: "example" });
    });

    testErrors({
      stubRequest: () => nock(apiBase).post("/generate").reply(404),
      callApi: () => testApi({ apiBase: apiBase }).generateTest(),
      expectedErrorCode: 404,
    });
  });

  describe("/update", () => {
    it("Passes the parameters & cookie to the update endpoint", async () => {
      const updateRequest = nock(apiBase)
        .post("/update", { dog: "woof" })
        .matchHeader("Authorization", "stubCookie")
        .reply(200, {});

      await testApi({ apiBase: apiBase }).updateTest({
        dog: "woof",
      });

      expect(updateRequest.isDone()).toBe(true);
    });

    it("Returns the response from the update endpoint", async () => {
      nock(apiBase)
        .post("/update", { dog: "woof" })
        .reply(200, { an: "example" });

      const response = await testApi({
        apiBase: apiBase,
      }).updateTest({ dog: "woof" });

      expect(response).toEqual({ an: "example" });
    });

    testErrors({
      stubRequest: () =>
        nock(apiBase).post("/update", { dog: "woof" }).reply(403),
      callApi: () =>
        testApi({ apiBase: apiBase }).updateTest({
          dog: "woof",
        }),
      expectedErrorCode: 403,
    });
  });

  describe("uploadImage", () => {
    it("puts the given file on the URL", async () => {
      const uploadRequest = nock("https://meow.cat")
        .put("/example", "File")
        .reply(200);

      await testApi({ apiBase }).uploadImage(
        "https://meow.cat/example",
        "File",
        () => {}
      );

      expect(uploadRequest.isDone()).toEqual(true);
    });

    describe("content-types", () => {
      it("Uploads a file with its specified type", async () => {
        const fileToUpload = new File(["a"], "file", { type: "image/jpeg" });
        const uploadRequest = nock("https://meow.cat")
          .put("/example", "a")
          .matchHeader("content-type", "image/jpeg")
          .reply(200);

        await testApi({ apiBase }).uploadImage(
          "https://meow.cat/example",
          fileToUpload,
          () => {}
        );

        expect(uploadRequest.isDone()).toEqual(true);
      });

      it("Defaults to image/png when no type is given", async () => {
        const fileToUpload = new File(["a"], "file");
        const uploadRequest = nock("https://meow.cat")
          .put("/example", "a")
          .matchHeader("content-type", "image/png")
          .reply(200);

        await testApi({ apiBase }).uploadImage(
          "https://meow.cat/example",
          fileToUpload,
          () => {}
        );

        expect(uploadRequest.isDone()).toEqual(true);
      });
    });
  });

  describe("/interpret", () => {
    it("Passes the cookie to the generate endpoint", async () => {
      const interpretRequest = nock(apiBase)
        .post("/interpret")
        .matchHeader("Authorization", "stubCookie")
        .reply(200, {});

      await testApi({ apiBase: apiBase }).interpretResult();

      expect(interpretRequest.isDone()).toBe(true);
    });

    it("Returns the response from the update endpoint", async () => {
      nock(apiBase).post("/interpret").reply(200, { an: "example" });

      const response = await testApi({
        apiBase: apiBase,
      }).interpretResult();

      expect(response).toEqual({ an: "example" });
    });

    testErrors({
      stubRequest: () => nock(apiBase).post("/interpret").reply(404),
      callApi: () => testApi({ apiBase: apiBase }).interpretResult(),
      expectedErrorCode: 404,
    });
  });
});
