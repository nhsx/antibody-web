import React from "react";
import {  renderWithStubTestContext, defaultRecord } from "utils/testUtils";
import PhotoPreview, { PhotoPreviewProps } from "../PhotoPreview";
import { fireEvent, screen, waitForElement, waitForElementToBeRemoved } from "@testing-library/react";
import TestRecord from "abt-lib/models/TestRecord";
import _ from 'lodash';

describe("<PhotoPreview>", () => {

  const testBlob = new Blob();

  const mockProps : PhotoPreviewProps = {
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
    const [, context] = await renderWithStubTestContext(
      <PhotoPreview
        {...mockProps}
        {...props}
      />,
      api,
      testRecord
    );
    
    return context;
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
    expect (await screen.getByText("15:00"));
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
    const submit = await screen.getByTestId("submit-photo");
    await fireEvent.click(submit);
    expect(api.uploadImage).toHaveBeenCalled();
    expect(api.interpretResult).toHaveBeenCalledTimes(0);
  });


  it("attempts to interpret the image if uploaded successfully", async () => {
    const api = {
      interpretResult: jest.fn(),
      uploadImage: jest.fn(() => Promise.resolve())
    };
    await renderPhotoPreview({ api });
    const submit = await screen.getByTestId("submit-photo");
    expect(api.uploadImage).toHaveBeenCalled();
    await fireEvent.click(submit);
    expect(api.interpretResult).toHaveBeenCalled();
  });


  it("notifies the user if they submit a blurred photo", async () => {
    const api = {
      interpretResult: jest.fn(() => Promise.resolve(defaultInterpretResponse ))
    };
    const props: Partial<PhotoPreviewProps> = {
      onInterpret: jest.fn()
    };

    await renderPhotoPreview({ props,  api });
    const submit = await screen.getByTestId("submit-photo");
    await fireEvent.click(submit);
    expect(await screen.getByTestId("upload-progress"));
    await waitForElementToBeRemoved(() => screen.getByTestId("upload-progress"));
    expect(props.onInterpret).toHaveBeenCalled();
  });

  it("notifies the user if they submit a blurred photo", async () => {
    const blurredResponse = _.clone(defaultInterpretResponse);
    blurredResponse.testRecord.result = "failed_checks";
    blurredResponse.testRecord.testCompleted = false;
    blurredResponse.testRecord.predictionData.success = false;
    blurredResponse.testRecord.predictionData.quality.blur = "blurred";
    const api = {
      interpretResult: jest.fn(() => Promise.resolve(blurredResponse))
    };
    await renderPhotoPreview({ api });
    const submit = await screen.getByTestId("submit-photo");
    await fireEvent.click(submit);
    await waitForElementToBeRemoved(() => screen.getByTestId("upload-progress"));
    await waitForElement(() => {
      return screen.getByTestId("image-error");
    });
  });

  // it("notifies the user if they submit an underexposed photo", async () => {
  //   await renderPhotoPreview({});
  //   const content = await screen.findAllByTestId("user-image"); 
  //   console.log(content);
  //   expect(content.length).toBe(1);
  // });


  // it("notifies the user if they submit an overexposed photo", async () => {
  //   await renderPhotoPreview({});
  //   const content = await screen.findAllByTestId("user-image"); 
  //   console.log(content);
  //   expect(content.length).toBe(1);
  // });


  // it("notifies the user if they submit an over + underexposed photo", async () => {
  //   await renderPhotoPreview({});
  //   const content = await screen.findAllByTestId("user-image"); 
  //   console.log(content);
  //   expect(content.length).toBe(1);
  // });


  // it("notifies the user if they submit a photo with no cassette visible photo", async () => {
  //   await renderPhotoPreview({});
  //   const content = await screen.findAllByTestId("user-image"); 
  //   console.log(content);
  //   expect(content.length).toBe(1);
  // });
});
