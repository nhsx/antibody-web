import { getAppConfig } from "../AppConfig";

describe("getAppConfig()", () => {
  let imageUploadFlag: string | undefined;

  beforeEach(() => {
    imageUploadFlag = process.env.REACT_APP_FLAG_IMAGE_UPLOAD;
  });

  afterEach(() => {
    process.env.REACT_APP_FLAG_IMAGE_UPLOAD = imageUploadFlag;
  });

  describe("imageUpload", () => {
    it("Sets image upload to false given the environment variable is false", () => {
      process.env.REACT_APP_FLAG_IMAGE_UPLOAD = "false";
      expect(getAppConfig().imageUpload).toBe(false);
    });

    it("Sets image upload to true given the environment variable is not set", () => {
      process.env.REACT_APP_FLAG_IMAGE_UPLOAD = undefined;
      expect(getAppConfig().imageUpload).toBe(true);
    });
  });
});
