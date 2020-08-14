import React from "react";
import { renderWithStubTestContext, defaultRecord } from "utils/testUtils";
import PhotoPreview, { PhotoPreviewProps } from "../PhotoPreview";
import { fireEvent, screen } from "@testing-library/react";
import TestRecord from "abt-lib/models/TestRecord";
import _ from 'lodash';
import { act } from "react-dom/test-utils";

describe("<PhotoPreview>", () => {

  const testBlob = new Blob();

  const mockProps: PhotoPreviewProps = {
    handleShowCamera: jest.fn(),
    handleImageAsFile: jest.fn(),
    onInterpret: jest.fn(),
    imageAsURI: 'imageuri',
    usedCamera: true,
    imageAsFile: new File([testBlob], 'testfile.jpg')
  };

  const mockApi = {

  };

  const defaultInterpretResponse = {
    testRecord: {
      ...defaultRecord,
      testCompleted: true,
      result: "positive",
      predictionData: {
        success: true,
        quality: {
          exposure: 'ok',
          blur: 'ok'
        },
        result: "positive",
        extracts: {
          rdt: 'base64string',
          diagnostic: [[20, 20], [40, 40]]
        }
      }
    }
  };

  const renderPhotoPreview = async ({ props = {}, api = mockApi, testRecord = {} }: { props?: Partial<PhotoPreviewProps>, api?: object, testRecord?: Partial<TestRecord> }) => {
    let context;

    await act(async () => {
      [, context] = await renderWithStubTestContext(
        <PhotoPreview
          {...mockProps}
          {...props}
        />,
        api,
        testRecord
      );
    });

    return context;
  };

  const submitPhoto = async () => {
    const submit = await screen.getByTestId("submit-photo");
    await act(async () => {
      await fireEvent.click(submit);
    });
  };

  const submitPhotoWithErrors = async () => {
    const submit = await screen.getByTestId("submit-photo");
    await act(async () => {
      await fireEvent.click(submit);
    });
    await screen.getByTestId("image-error-messages");
  };

  it("Renders the preview component", async () => {
    await renderPhotoPreview({});
    const content = await screen.findAllByTestId("photo-preview");
    expect(content.length).toBe(1);
  });

  it("displays the image taken back to the user", async () => {
    await renderPhotoPreview({});
    const content = await screen.findAllByTestId("user-image");
    expect(content.length).toBe(1);
    expect(content[0].getAttribute('src')).toEqual('imageuri');
  });

  it("displays the time remaining to the user", async () => {
    await renderPhotoPreview({});
    const content = await screen.findAllByTestId("picture-timer");
    expect(content.length).toBe(1);
    expect(await screen.getByText("15:00"));
    //@ TODO: Enable this once we have hooked in the second timer
    //expect (await waitForElement(() => screen.getByText("14:59"), { timeout: 2000 }));
  });

  it("uploads the picture to the interpret endpoint automatically", async () => {
    const api = {
      uploadImage: jest.fn(() => Promise.resolve())
    };
    await renderPhotoPreview({ api });
    expect(api.uploadImage).toHaveBeenCalled();
  });

  it("does not attempt to interpret the image if it could not be uploaded", async () => {
    const api = {
      interpretResult: jest.fn(),
      uploadImage: jest.fn(() => Promise.reject())
    };
    await renderPhotoPreview({ api });
    await submitPhoto();
    expect(api.uploadImage).toHaveBeenCalled();
    expect(api.interpretResult).toHaveBeenCalledTimes(0);
  });

  it("attempts to interpret the image if uploaded successfully", async () => {
    const api = {
      interpretResult: jest.fn(),
      uploadImage: jest.fn(() => Promise.resolve())
    };
    await renderPhotoPreview({ api });
    expect(api.uploadImage).toHaveBeenCalled();
    await submitPhoto();
    expect(api.interpretResult).toHaveBeenCalled();
  });

  it("updates the test with the time uploaded if uploaded successfully", async () => {
    const api = {
      interpretResult: jest.fn(),
      uploadImage: jest.fn(() => Promise.resolve()),
      updateTest: jest.fn(() => Promise.resolve())
    };
    await renderPhotoPreview({ api });
    await submitPhoto();
    expect(api.updateTest).toHaveBeenCalled();
  });

  it("attempts to interpret the image if uploaded successfully", async () => {
    const api = {
      interpretResult: jest.fn(),
      uploadImage: jest.fn(() => Promise.resolve())
    };
    await renderPhotoPreview({ api });
    expect(api.uploadImage).toHaveBeenCalled();
    await submitPhoto();
    expect(api.interpretResult).toHaveBeenCalled();
  });

  it("calls the onInterpret prop if the image passes validation checks and receives a result", async () => {
    const api = {
      interpretResult: jest.fn(() => Promise.resolve(defaultInterpretResponse))
    };
    const props: Partial<PhotoPreviewProps> = {
      onInterpret: jest.fn()
    };
    await renderPhotoPreview({ props, api });
    await submitPhoto();

    expect(props.onInterpret).toHaveBeenCalled();

  });


  it("notifies the user if they submit a blurred photo", async () => {
    const response = _.cloneDeep(defaultInterpretResponse);
    response.testRecord.testCompleted = false;
    response.testRecord.predictionData.success = false;
    response.testRecord.predictionData.quality.blur = "blurred";
    const api = {
      interpretResult: jest.fn(() => Promise.resolve(response))
    };
    await renderPhotoPreview({ api });
    await submitPhotoWithErrors();
    await screen.getByTestId("blurred");
  });

  it("notifies the user if they submit an underexposed photo", async () => {
    const response = _.cloneDeep(defaultInterpretResponse);
    response.testRecord.testCompleted = false;
    response.testRecord.predictionData.success = false;
    response.testRecord.predictionData.quality.exposure = "underexposed";
    const api = {
      interpretResult: jest.fn(() => Promise.resolve(response))
    };
    await renderPhotoPreview({ api });
    await submitPhotoWithErrors();
    await screen.getByTestId("underexposed");
  });

  it("notifies the user if they submit an overexposed photo", async () => {
    const response = _.cloneDeep(defaultInterpretResponse);
    response.testRecord.testCompleted = false;
    response.testRecord.predictionData.success = false;
    response.testRecord.predictionData.quality.exposure = "overexposed";
    const api = {
      interpretResult: jest.fn(() => Promise.resolve(response))
    };
    await renderPhotoPreview({ api });
    await submitPhotoWithErrors();
    await screen.getByTestId("overexposed");
  });

  it("notifies the user if they submit an over and underexposed photo", async () => {
    const response = _.cloneDeep(defaultInterpretResponse);
    response.testRecord.testCompleted = false;
    response.testRecord.predictionData.success = false;
    response.testRecord.predictionData.quality.exposure = "over_and_underexposed";
    const api = {
      interpretResult: jest.fn(() => Promise.resolve(response))
    };
    await renderPhotoPreview({ api });
    await submitPhotoWithErrors();
    await screen.getByTestId("over_and_underexposed");
  });


  it("notifies the user if no rdt device can be found", async () => {
    const response = _.cloneDeep(defaultInterpretResponse);
    response.testRecord.testCompleted = false;
    response.testRecord.predictionData.result = "rdt_not_found";
    response.testRecord.predictionData.success = false;
    const api = {
      interpretResult: jest.fn(() => Promise.resolve(response))
    };
    await renderPhotoPreview({ api });
    await submitPhotoWithErrors();
    await screen.getByTestId("rdt_not_found");
  });

  it("notifies the user if no diagnostic square can be found", async () => {
    const response = _.cloneDeep(defaultInterpretResponse);
    response.testRecord.testCompleted = false;
    response.testRecord.predictionData.result = "diagnostic_not_found";
    response.testRecord.predictionData.success = false;

    const api = {
      interpretResult: jest.fn(() => Promise.resolve(response))
    };

    await renderPhotoPreview({ api });
    await submitPhotoWithErrors();
    await screen.getByTestId("diagnostic_not_found");
  });
});