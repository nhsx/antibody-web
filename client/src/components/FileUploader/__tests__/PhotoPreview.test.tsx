import React from "react";
import {  renderWithStubTestContext } from "utils/testUtils";
import PhotoPreview from "../PhotoPreview";
import { screen } from "@testing-library/react";

describe("<PhotoPreview>", () => {



  const testBlob = new Blob();

  const mockProps = {
    handleShowCamera: jest.fn(),
    handleImageAsFile: jest.fn(),
    onInterpret: jest.fn(),
    imageAsURI: 'imageuri',
    usedCamera: true,
    imageAsFile: new File([testBlob], 'testfile.jpg')
  };

  const mockApi = {

  };

  const renderPhotoPreview = async ({ usedCamera = true, api = mockApi }: { usedCamera?: boolean, api?: object }) => {
    const [, context] = renderWithStubTestContext(
      <PhotoPreview
        {...mockProps}
        usedCamera={usedCamera} />,
      api
    );
    return context;
  };


  it("Renders the preview component", async () => {
    await renderPhotoPreview({});
    const content = await screen.findAllByTestId("photo-preview"); 
    expect(content.length).toBe(1);
  });
});
